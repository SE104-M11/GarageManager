exports.initChiTietSuaChua = function(mongoose) {
  const Schema = mongoose.Schema;

  const ChiTietSuaChuaSchema = new Schema({
     maCTSC: {
       type:String,
       require: true,
       unique: true
     },
     noiDung: {
       type: String,
       require: true
     },
     maVaTu: {
       type:String,
       require: true
     },
     soLuong: {
       type:Number,
       require: true
     },
     maTienCong: {
       type:String,
       require: true
     },
     thanhTien: {
       type:Number,
       require: true
     },
     maPSC: {
       type:Number,
       require: true
     }
  })

  const ChiTietSuaChua = mongoose.model('chitietsuachuas', ChiTietSuaChuaSchema);

  return ChiTietSuaChua;
}