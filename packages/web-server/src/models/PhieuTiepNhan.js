exports.initPhieuTiepNhan = function(mongoose) {
    
    const Schema = mongoose.Schema;
    
        // Create Bill Schema
        const PhieuTiepNhanSchema = new Schema({
            maXe: {
                type:String,
                require: true
            },
            ngayTN:{
                type:String,
                require: true
            },
        })
    
        const PhieuTiepNhan = mongoose.model('phieutiepnhans', PhieuTiepNhanSchema);
    
        return PhieuTiepNhan;
    }