const { TaiKhoan } = require('../models');
const TaiKhoanService = require('../services/TaiKhoan');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer'); 
const saltRounds = Number(process.env.APP_SALT_ROUNDS) || 10;
const {generateID, generatePassword}=require('../helpers/generateID')
const {successResponse,errorResponse}= require('../utils/objResponse');


exports.register = async (req, res) => {
    try{
        const input = req.body;
        if(!input) 
        return res.status(400).json(errorResponse("Không tìm thấy dữ liệu"))
        const checkUsername = await TaiKhoanService.findOne({tenTaiKhoan:input.tenTaiKhoan});
        const checkEmail = await TaiKhoanService.findOne({email:input.email});
    
        if(checkUsername)
            return res.status(400).json(errorResponse("Tên tài khoản đã tồn tại. Vui lòng kiểm tra lại"))
    
        if(checkEmail)
            return res.status(400).json(errorResponse("Email đã được dùng. Vui lòng kiểm tra lại"))
    
        let password = await bcrypt.hash(input.matKhau, saltRounds);
        maTaiKhoan=generateID("TK");
    
        const newUser = new TaiKhoan({
            ...input,
            maTaiKhoan:maTaiKhoan,
            matKhau:password,
            quyenHan: 0,
            status:0
        });
    
        await newUser.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'managergarageuit@gmail.com',
                pass: '12345678@a'
            }
            });
        
            const mailOptions = {
            from: 'managergarageuit@gmail.com',
            to: input.email,
            subject: `[ManageGara UIT] Xác nhận tài khoản - ${input.tenTaiKhoan}`,
            html: `
                <h1>Xác nhận mật khẩu</h1>
                <p>Chào ${input.tenTaiKhoan},</p>
                <p>Vui lòng xác nhận bằng cách nhấn bằng cách nhấn <a href="http://localhost:3002/validate-account/${input.tenTaiKhoan}">vào đây</a> </p>
            `
        };
        transporter.sendMail(mailOptions);
        return res.status(200).json(successResponse("Đăng kí tài khoản thành công. Vui lòng truy cập email để kích hoạt tài khoản"));
    }catch(e){
        console.log(e);
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra vui lòng thử lại"))
    }
    
}

exports.update = async (req, res) => {
    try{
        const input = req.body;
        if(!input) 
        return res.status(400).json(errorResponse("Không tìm thấy dữ liệu"))
        const checkUsername = await TaiKhoanService.findOne({tenTaiKhoan:input.tenTaiKhoan});
    
        if(!checkUsername)
            return res.status(400).json(errorResponse("Tên tài khoản không tồn tại. Vui lòng kiểm tra lại"))    
            const checkPw = await bcrypt.compare(input.matKhau,checkUsername.matKhau);
            if(!checkPw){
                return res.status(401).json(errorResponse("Mật khẩu của bạn không đúng. Vui lòng kiểm tra lại"))
            }
            let password = await bcrypt.hash(input.matKhauMoi, saltRounds);
        
    
        await TaiKhoanService.update({tenTaiKhoan:input.tenTaiKhoan},{matKhau:password});
        return res.status(200).json(successResponse("Đổi mật khẩu tài khoản thành công"));
    }catch(e){
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra vui lòng thử lại"))
    }
    
}

exports.forgetPassword = async (req, res) => {
    try{
        const email = req.body.email;
        console.log(email);
        const user = await TaiKhoanService.findOne({ email: email});
        const newPw = generatePassword();
        console.log(newPw);
        const password = await bcrypt.hash(newPw, saltRounds);
        await TaiKhoanService.update({email:email},{matKhau:password});
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'managergarageuit@gmail.com',
                pass: '12345678@a'
            }
            });
        
            const mailOptions = {
            from: 'managergarageuit@gmail.com',
            to: user.email,
            subject: `[ManageGara UIT] Gửi lại mật khẩu mới cho tài khoản - ${user.tenTaiKhoan}`,
            html: `
                <h1>Gửi lại mật khẩu mới</h1>
                <p>Chào ${user.tenTaiKhoan},</p>
                <p>Đây là password mới của bạn: <b>${newPw}</b></p>
                <p>Đăng nhập ngay bằng cách nhấn <a href="http://localhost:3002/log-in">vào đây</a></p>
            `
        };
        
        transporter.sendMail(mailOptions);

        return res.status(200).json(successResponse("Cấp mật khẩu tài khoản thành công. Bạn vui lòng vào email để lấy mật khẩu mới"));
    }catch(e){
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra vui lòng thử lại"))
    }
    
}
exports.validateUser = async (req, res) => {
    try{
        const userName = req.body.userName;
       await TaiKhoanService.update({ tenTaiKhoan: userName},{status:1});
        return res.status(200).json(successResponse("Cấp mật khẩu tài khoản thành công. Bạn vui lòng vào email để lấy mật khẩu mới"));
    }catch(e){
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra vui lòng thử lại"))
    }
    
}

