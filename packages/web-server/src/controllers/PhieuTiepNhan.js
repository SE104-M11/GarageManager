const { PhieuTiepNhan } = require('../models');
const { Xe } = require('../models');
const { KhachHang } = require('../models');
const { generateID } = require('../helpers/generateID');

const createOne = async (req, res) => {
  console.log("BODY: ", req.body);
  const { tenChuXe, diaChi, email, dienThoai } = req.body;
  const { bienSo, maHieuXe } = req.body;
  let maKH, maXe; 

  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  //Kiem tra xe thong tin khach hang da duoc dien vao database chua?
  let user = await KhachHang.findOne({ email });

  console.log("USER: ", user);
  if(!user) {
    let newUser =  new KhachHang({
      tenKhachHang: tenChuXe,
      diaChi,
      email,
      soDT: dienThoai
    })
    await newUser.save()
    .then(res => {
      console.log("Tạo khách hàng mới (nếu như chưa tồn tại) từ PTN: ", res)
      maKH = res;
    });
  }
  else {
    await KhachHang.findOne({ email }).then(res => {
      maKH = res;
      console.log("RES: ", res);
    })
  }

  // Tao mot Xe moi
  let newXe = new Xe({
    maKhachHang: maKH._id,
    bienSo,
    tienNo: 0,
    trangThai: 0,
    maHieuXe,
  })
  await newXe.save()
    .then(res => {
      console.log("Lưu vào bảng Xe từ PhieuTiepNhan: ", res);
      maXe = res;
    })

  // Cuoi cung la tao PhieuTiepNhan
  let newPhieuTiepNhan = new PhieuTiepNhan({
    maXe: maXe._id,
    ngayTN: date
  })
  try {
    await newPhieuTiepNhan.save()
    .then(res => {
     console.log("Them PTN Thanh cong: ", res)
    })
  }
  catch (err) {
    console.log("Loi them PTN: ", err)
  }

  res.status(201).json({
    statusCode: 201,
    message: 'Create new PTN successfully'
})
}

const xoaXeSua = async (req, res) => {
  console.log("req.body", req.body.plate);
  try {
    await Xe.deleteMany({ bienSo: req.body.plate })
    res.status(201).json({
      statusCode: 201,
      message: 'Xoa thanh cong' })  
  } catch (err){
    console.log("Error xoa xe: ", err);
  }

}

const getPhieuTiepNhan = async (req, res) => {

  let data = {
    xe: [],
    khachang: []
  };

  let query = req.query;

  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  try {
      let PTNToday = await PhieuTiepNhan.find({ ngayTN: date });
      for(var i of PTNToday) {
        let xe = await Xe.find({ _id: i.maXe });
        console.log("xE: ", xe);
        let khachhang = await KhachHang.find({ _id: xe[0].maKhachHang });
        console.log("KHACH-Hang: ", khachhang);


        data.xe.push(xe[0]);
        data.khachang.push(khachhang);
      }
;

      return res.status(200).json(data);
  } catch (err) {
      return res.status(500).json({
          statusCode: 500,
          message: err.message || `Some errors happened when finding accessory`
      });
  }

}
const getPTNbyMaXe = async (req, res) => {

  let maXe = req.query.maXe;
  
  // Lay ma PhieuTiepNhan tu maXe ma nguoi dung nhap len
  await PhieuTiepNhan.find({ maXe }).then( async res1 => {
    let data = res1;
    return res.status(200).json(data);
    
  })
}

module.exports = {
  createOne,
  getPhieuTiepNhan,
  xoaXeSua,
  getPTNbyMaXe
}