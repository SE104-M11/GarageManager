exports.initXe = function(mongoose) {
    
const Schema = mongoose.Schema;

    // Create Bill Schema
    const XeSchema = new Schema({
        maKhachHang: {
            type:String,
        },
        bienSo:{
            type:String
        },
        tienNo:{
            type:Number
        },
        diaChi:{
            type:String
        },
        trangThai:{
            type:Number
        },
        maHieuXe:{
            type:String
        },
    })

    // Create Xe Model
    const Xe = mongoose.model('Xes', XeSchema);

    return Xe;
}