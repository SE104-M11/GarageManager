exports.initQuyDinh = function(mongoose) {
  const Schema = mongoose.Schema;

  // Create QuyDinh Schema
  const QuyDinhSchema = new Schema({
    maQuyDinh: {
      type:String,
      require: true
    },
     soXeMax: {
       type:Number,
       require: true
     }
  })

  // Create QuyDinh Model
  const QuyDinh = mongoose.model('quydinhs', QuyDinhSchema);

  return QuyDinh;
}