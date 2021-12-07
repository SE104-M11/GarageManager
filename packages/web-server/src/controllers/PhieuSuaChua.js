const { PhieuSuaChua, Wage, Accessory, ChiTietSuaChua, Xe, PhieuTiepNhan, DoanhSo, ChiTietDoanhSo } = require('../models');
const { generateID } = require('../helpers/generateID');
const { json } = require('express');

const createOne = async (req, res) => {
  console.log("BODY: ", req.body);
  const { bienSo, noiDung, nameLoaiVatTu, nameTienCong, soLuong } = req.body;
  let maVT, maTC, maXe, maPTN, maPSC;
  
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

  //  Truy xuat vao bang loai vat tu va tien cong de lat maVT va maTC
  await Accessory.findOne({ name: nameLoaiVatTu }).then(res => {
    maVT = res;
  }).catch(err => {console.log()});
  await Wage.findOne({ name: nameTienCong }).then(res => {
    maTC = res;
  }).catch(err => {console.log()});

  // Truy xuat vao bang Xe de tim phieu tiep nhan:
  await Xe.findOne({ bienSo }).then(res => {
    maXe = res;
  }).catch(err => {console.log()});
  await PhieuTiepNhan.findOne({ maXe: maXe._id }).then(res => {
    maPTN = res;
  }).catch(err => {console.log()});

  console.log("maVT: ", maVT);
  console.log("maTC: ", maTC);
  console.log("maXe: ", maXe);


  let newPSC = new PhieuSuaChua({
    maPTN: maPTN._id,
    ngaySC: date,
    tongTienSC: 0
  })
  await newPSC.save().then(res => {
    maPSC = res;
    console.log("PSC: ", res);
  })

  let newCTSC = new ChiTietSuaChua({
    noiDung,
    maVaTu: maVT._id,
    soLuong,
    maTienCong: maTC._id,
    thanhTien: soLuong*maVT.unitPrice,
    maPSC: maPSC._id
  })
  console.log("CTST: ", newCTSC)
  await newCTSC.save().then((res) => {
    console.log("CTSC: ", res);
  })
 
  // await ChiTietSuaChua.remove({});
  // await PhieuSuaChua.remove({});
  // await ChiTietSuaChua.find({}).then(res => {
  //   console.log('CTSC: ', res);
  // });
  // await PhieuSuaChua.find({}).then(res => {
  //   console.log('PSC: ', res);
  // });

  // cập nhât số lượng sửa trong chi tiết doanh số
  date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ today.getDate();
  today = new Date(date);
  let { maHieuXe } = await Xe.findOne({ bienSo }, { maHieuXe: 1 });
  let ds = await DoanhSo.aggregate([{$project: { month: {$month: '$ThoiDiemDS'}, year: { $year: '$ThoiDiemDS'}, tongDS: 1}}, 
    {$match: { month: today.getMonth() + 1, year: today.getFullYear()}}]);

    if(!ds[0]){
        let newDS = await new DoanhSo({ThoiDiemDS: date, tongDS: 0});
        await newDS.save();
        let { _id } = await DoanhSo.findOne({ ThoiDiemDS: date }, { _id: 1 })
        let newCtds = await new ChiTietDoanhSo({
            maHieuXe: maHieuXe,
            soLuongSua: 1,
            tiLe: 0,
            tongTien: 0,
            maDoanhSo: _id
        });
        await newCtds.save();
    } else {
        let ctds = await ChiTietDoanhSo.findOne({ maDoanhSo: ds[0]._id, maHieuXe: maHieuXe });
        if(!ctds) {
            let newCtds = await new ChiTietDoanhSo({
                maHieuXe: maHieuXe,
                soLuongSua: 1,
                tiLe: 0.5,
                tongTien: 0,
                maDoanhSo: ds[0]._id
            });
            await newCtds.save();
        } else {
            await ChiTietDoanhSo.updateOne({ _id: ctds._id }, { soLuongSua: ctds.soLuongSua + 1 });
        }      
    }

  // cập nhật tiền nợ trong xe
  await Xe.updateOne({ bienSo: bienSo }, { tienNo: maXe.tienNo + soLuong*maVT.unitPrice })

  return res.status(201).json({
    statusCode: 201,
    message: 'Receiving your form succesfully'
  });
}

const getAllCTSC = async (req, res) => {
  try {
    let data;
    await ChiTietSuaChua.find({}).then(res => {
      data = res;
    })
    
    return res.status(200).json(data);
} catch (err) {
    return res.status(500).json({
        statusCode: 500,
        message: err.message || `Some errors happened when finding accessory`
    });
}
}

const getVatTu = async (req, res) => {
  const maVatTu = req.query.maVatTu;
  await Accessory.findOne({ _id: maVatTu }).then(data => {
    return res.status(200).json(data);
  }).catch(err => {
    return res.status(500).json({
      statusCode: 500,
      message: err.message || `Some errors happened when finding accessory`
  });
  })

}
const getTienCong = async (req, res) => {
  const maTienCong = req.query.maTienCong;
  await Wage.findOne({ _id: maTienCong }).then(data => {
    return res.status(200).json(data);
  }).catch(err => {
    return res.status(500).json({
      statusCode: 500,
      message: err.message || `Some errors happened when finding accessory`
  });
  })
}
module.exports = {
  createOne,
  getAllCTSC,
  getVatTu,
  getTienCong
}