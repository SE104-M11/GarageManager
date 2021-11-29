const { TaiKhoan } = require('../models');

/* `````````````````````````````````` */
// Put your custom services code below this line
exports.create = async input => {
    
    // Create TaiKhoan base on input
    let newTaiKhoan = await new TaiKhoan({
        ...input
    });
    await newTaiKhoan.save();

    return newTaiKhoan;
}

exports.findOne = (obj) =>{
    return TaiKhoan.findOne(obj);
}

exports.findByID = (id) =>{
    return TaiKhoan.findById(id);
}

exports.update = (clause,input) =>{
    return TaiKhoan.updateOne(clause,input);
}

/* `````````````````````````````````` */