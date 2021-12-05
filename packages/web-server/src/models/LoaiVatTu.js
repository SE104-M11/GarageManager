exports.initLoaiVatTu = function(mongoose) {
    const Schema = mongoose.Schema;
  
    const LoaiVatTuSchema = new Schema({
       maLoaiVatTu: {
         type:String,
       },
       tenLoaiVatTu: {
         type:String,
         require: true,
       }
    })
  
    const LoaiVatTu = mongoose.model('loaivattus', LoaiVatTuSchema);
  
    return LoaiVatTu;
  }