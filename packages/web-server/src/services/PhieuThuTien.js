const { PhieuThuTien, Xe, DoanhSo, ChiTietDoanhSo } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async (formInput) => {
  let date = new Date(formInput.ngayTT);

  let xe = await Xe.findOne(
    { bienSo: formInput.bienSo },
    { maHieuXe: 1, bienSo: 1, tienNo: 1 }
  );

  if (!xe) {
    return Promise.reject({ message: 'Xe not found' });
  }

  if (formInput.soTienThu > xe.tienNo) {
    return Promise.reject({ message: 'Too much money' });
  }

  let newPTT = await new PhieuThuTien({
    ...formInput,
  });

  await Xe.updateOne(
    { bienSo: formInput.bienSo },
    { tienNo: xe.tienNo - formInput.soTienThu }
  );

  await newPTT.save();

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
};

exports.find = () => {
  return PhieuThuTien.find({});
};

exports.findOne = (id) => {
  return PhieuThuTien.findOne({ _id: id }).populate('MaPTT');
};
/* `````````````````````````````````` */
