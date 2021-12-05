const { response } = require("express");
const jwtHelper = require("../helpers/jwt.helper");
const TaiKhoanService = require('../services/TaiKhoan');
const bcrypt = require('bcrypt');
const {successResponse,errorResponse}= require('../utils/objResponse');

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE? process.env.ACCESS_TOKEN_LIFE : "10d";
console.log(accessTokenLife);
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET? process.env.ACCESS_TOKEN_SECRET: 'QuocDepTrai';
console.log(accessTokenSecret);

let login = async (req, res) => {
  try {
    //console.log(accessTokenSecret);
    var dataLogin=req.body;
    var taikhoan= await TaiKhoanService.findOne({tenTaiKhoan:dataLogin.tenTaiKhoan});
    if(taikhoan.status===0) return res.status(401).json(errorResponse("Tên tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản"))
    if(taikhoan&&taikhoan!==null){
      //tham số dầu tiên là mật khẩu chưa băm, cái thứ 2 là đã băm
      const checkPw = await bcrypt.compare(dataLogin.matKhau,taikhoan.matKhau);

        if(checkPw){
          console.log(accessTokenLife);
            const accessToken = await jwtHelper.generateToken(taikhoan, accessTokenSecret, accessTokenLife);
            console.log(taikhoan);
            return res.status(200).json(successResponse("Bạn đã đăng nhập thành công",{accessToken,
            tenTaiKhoan:taikhoan.tenTaiKhoan,
            email:taikhoan.email,
            quyenHan:taikhoan.quyenHan}));
        }else{
            return res.status(401).json(errorResponse("Mật khẩu của bạn không đúng. Vui lòng kiểm tra lại"))
        }
    }else{
        return res.status(401).json(errorResponse("Tên tài khoản không đúng. Vui lòng kiểm tra lại"))
    }

  } catch (error) {
    return res.status(500).json(errorResponse("Đã có lỗi xảy ra. Vui lòng thực hiện lại"));
  }
}

module.exports = {
  login: login,
}