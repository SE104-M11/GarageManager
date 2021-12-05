exports.initPhieuThuTien = function(mongoose) {
    
    const Schema = mongoose.Schema;
    
        // Create Bill Schema
        const PhieuThuTienSchema = new Schema({
            maPTT: {
                type:String,
            },
            maXe: {
                type:String,
                require: true
            },
            bienSo: {
                type:String,
                require: true
            },
            ngayTT:{
                type: Date,
                require: true
            },
            soTienThu:{
                type: Number,
                require: true
            },
            hoTen:{
                type: String,
            },
            dienThoai:{
                type: String,
            },
            email:{
                type: String,
            }
        })
    
        const PhieuThuTien = mongoose.model('phieuthutiens', PhieuThuTienSchema);
    
        return PhieuThuTien;
    }
