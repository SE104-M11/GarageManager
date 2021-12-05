const mongoose = require('mongoose');

const { initBill } = require('./Bill');
const { initKhachHang } = require('./KhachHang');
const { initHieuXe } = require('./HieuXe');
const { initXe } = require('./Xe');
const { initChiTietDoanhSo } = require('./ChiTietDoanhSo');
const { initTaiKhoan } = require('./TaiKhoan');
const { initQuyDinh } = require('./QuyDinh');
const { initChiTietSuaChua } = require('./ChiTietSuaChua');
const { initAccessory } = require('./Accessory');
const { initAccessoryImportForm } = require('./AccessoryImportForm');
const { initWage } = require('./Wage');
const { initInventoryReport } = require('./InventoryReport');
const { initInventoryReportDetail } = require('./InventoryReportDetail');
const { initParameter } = require('./Parameter');
const { initLoaiVatTu } = require('./LoaiVatTu');
const { initPhieuTiepNhan } = require('./PhieuTiepNhan');
const { initPhieuSuaChua } = require('./PhieuSuaChua');
const { initPhieuThuTien } = require('./PhieuThuTien');
const { initDoanhSo } = require('./DoanhSo');

const db = {};

// Init Models
db.Bill = initBill(mongoose);

// Init Models
db.KhachHang = initKhachHang(mongoose);
db.Xe = initXe(mongoose);
db.HieuXe = initHieuXe(mongoose);
db.ChiTietDoanhSo = initChiTietDoanhSo(mongoose);
db.TaiKhoan = initTaiKhoan(mongoose);
db.QuyDinh = initQuyDinh(mongoose);
db.ChiTietSuaChua = initChiTietSuaChua(mongoose);
db.LoaiVatTu = initLoaiVatTu(mongoose);
db.Accessory = initAccessory(mongoose);
db.AccessoryImportForm = initAccessoryImportForm(mongoose);
db.Wage = initWage(mongoose);
db.InventoryReport = initInventoryReport(mongoose);
db.InventoryReportDetail = initInventoryReportDetail(mongoose);
db.Parameter = initParameter(mongoose);
db.PhieuTiepNhan = initPhieuTiepNhan(mongoose);
db.PhieuSuaChua = initPhieuSuaChua(mongoose);
db.PhieuThuTien = initPhieuThuTien(mongoose);
db.DoanhSo = initDoanhSo(mongoose);

module.exports = db;
