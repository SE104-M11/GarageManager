const { PhieuSuaChua, Wage, Accessory, ChiTietSuaChua } = require('../models');
const { generateID } = require('../helpers/generateID');

const createOne = async (req, res) => {
  console.log("BODY: ", req.body);
  const { maPSC, noiDung, nameLoaiVatTu, nameTienCong, soLuong } = req.body;
  const maCTSC = generateID('CTSC');

  // Kiem tra typeAccessory(tenLoaiVatTu) co ton tai trong bang LoaiVatTu ko
  let isExist = await Accessory.findOne({ name: nameLoaiVatTu });
  // Kiem tra xem thuoc tinh name(tenTienCong) co ton tai trong bang Wage ko
  let isExistWage = await Wage.findOne({ name: nameTienCong });

  if(isExist && isExistWage) {
    let maVaTu = isExist.maVaTu;
    let maTienCong = isExistWage.maTienCong;
    let thanhTien = soLuong*isExist.donGia + isExistWage.gia;
    let newCTSC = new ChiTietSuaChua({
      maCTSC,
      noiDung,
      maVaTu,
      soLuong,
      maTienCong,
      thanhTien,
      maPSC
    })
    await newCTSC.save();

    // Kiem tra xem maPSC ma k.hang nhap la lan dau tien hay ko? Nếu là lần đầu tiên thì cần tạo mới PSC, còn ko phải thì chỉ cần cập
    // nhật TongTienSC cho cái maPSC mà người dùng nhập
    let isCheck = PhieuSuaChua.findOne({ maPSC });
    if(!isCheck) {
      const today = new Date();
      const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      const maPSC = generateID('PSC');

      let newPSC = new PhieuSuaChua({
        maPSC,
        ngaySC: date,
        tongTienSC: soLuong*isExist.donGia + isExistWage.gia,
        maPTN: '1'
      })
      await newPSC.save();

    }
    else {
      let tongTienHienTai = isCheck.thanhTien;

      await PhieuSuaChua.updateOne({ maPSC }, {$set: {tongTienSC: tongTienHienTai + soLuong*isExist.donGia + isExistWage.gia}}, (req, res) => {
        if (err) throw err;
        console.log("1 document updated");
      });
    }
    return res.status(201).json({
      statusCode: 201,
      message: ''
    })
  }
  else {
    return res.status(500).json({
      statusCode: 500,
      message: 'Tên loại vật tư hoặc tên tiền công không hợp lệ'
  });
  }

}

module.exports = {
  createOne
}