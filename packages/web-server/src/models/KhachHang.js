exports.initKhachHang = function(mongoose) {

    const Schema = mongoose.Schema;

    // Create Bill Schema
    const KhachHangSchema = new Schema({
        tenKhachHang:{
            type:String
        },
        soDT:{
            type:String
        },
        diaChi:{
            type:String
        },
        email:{
            type:String
        },
    })

    // Create KhachHang Model
    const KhachHang = mongoose.model('khachhangs', KhachHangSchema);

    return KhachHang;
}