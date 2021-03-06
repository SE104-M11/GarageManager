const { PhieuThuTien, Xe, DoanhSo, ChiTietDoanhSo, PhieuTiepNhan, PhieuSuaChua } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async (formInput) => {
  try{
    let date = new Date(formInput.ngayTT);

  let xe = await Xe.findOne(
    { bienSo: formInput.bienSo },
    { maHieuXe: 1, bienSo: 1, tienNo: 1 }
  );

  if (!xe) {
    return Promise.reject({ message: 'Xe not found' });
  }

  // if (formInput.soTienThu > xe.tienNo) {
  //   return Promise.reject({ message: 'Too much money' });
  // }

  let newPTT = await new PhieuThuTien({
    ...formInput,
  });
  let tienNo = (xe.tienNo - formInput.soTienThu)<0?0: (xe.tienNo - formInput.soTienThu);
  console.log(tienNo);
  await Xe.updateOne(
    { bienSo: formInput.bienSo },
    { tienNo: tienNo }
  );

  let ptt = await newPTT.save();
   
  let objPhieuTiepNhan = await PhieuTiepNhan.findOne({maXe:xe._id.toString(),isDeleted:0});
  let objPhieuSuaChua = await PhieuSuaChua.findOne({maPTN:objPhieuTiepNhan._id.toString(),isDeleted:0});
 
  await PhieuTiepNhan.update({_id:objPhieuTiepNhan._id.toString(),isDeleted:0},{isDeleted:1,maPhieuThuTien:ptt._id.toString()});
  await PhieuSuaChua.update({_id:objPhieuSuaChua._id.toString(),isDeleted:0},{isDeleted:1,maPhieuThuTien:ptt._id.toString()});

  let ds = await DoanhSo.aggregate([
    {
      $project: {
        month: { $month: '$ThoiDiemDS' },
        year: { $year: '$ThoiDiemDS' },
        tongDS: 1,
      },
    },
    { $match: { month: date.getMonth() + 1, year: date.getFullYear() } },
  ]);

  if (!ds[0]) {
    let newDS = await new DoanhSo({
      ThoiDiemDS: formInput.ngayTT,
      tongDS: formInput.soTienThu,
    });
    await newDS.save();
    let { _id } = await DoanhSo.findOne(
      { ThoiDiemDS: formInput.ngayTT },
      { _id: 1 }
    );
    let newCtds = await new ChiTietDoanhSo({
      maHieuXe: xe.maHieuXe,
      tiLe: 0.5,
      tongTien: formInput.soTienThu,
      maDoanhSo: _id,
    });
    await newCtds.save();
  } else {
    await DoanhSo.updateOne(
      { _id: ds[0]._id },
      { tongDS: ds[0].tongDS + formInput.soTienThu }
    );
    let ctds = await ChiTietDoanhSo.findOne({
      maDoanhSo: ds[0]._id,
      maHieuXe: xe.maHieuXe,
    });
    if (!ctds) {
      let newCtds = await new ChiTietDoanhSo({
        maHieuXe: xe.maHieuXe,
        tiLe: 0.5,
        tongTien: formInput.soTienThu,
        maDoanhSo: ds[0]._id,
      });
      await newCtds.save();
    } else {
      await ChiTietDoanhSo.updateOne(
        { _id: ctds._id },
        { tongTien: ctds.tongTien + formInput.soTienThu }
      );
    }
  }

  return newPTT;
  }
  catch(e){
    console.log(e);
  }
  
};

exports.find = () => {
  return PhieuThuTien.find({});
};

exports.findOne = (id) => {
  return PhieuThuTien.findOne({ _id: id }).populate('MaPTT');
};
/* `````````````````````````````````` */
