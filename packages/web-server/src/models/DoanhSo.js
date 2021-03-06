exports.initDoanhSo = function(mongoose) {
    
    const Schema = mongoose.Schema;
    
        // Create Bill Schema
        const DoanhSoSchema = new Schema({
            maDS: {
                type:String,
            },
            ThoiDiemDS: {
                type:Date,
                require: true
            },
            tongDS:{
                type: Number,
                require: true
            },
        })
    
        const DoanhSo = mongoose.model('doanhsos', DoanhSoSchema);
    
        return DoanhSo;
    }