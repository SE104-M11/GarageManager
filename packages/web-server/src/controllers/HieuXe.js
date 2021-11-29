const { HieuXe } = require('../models');
const HieuXeService = require('../services/HieuXe');
const {generateID}= require('../helpers/generateID');
const {successResponse,errorResponse}= require('../utils/objResponse');

const deleteOne = async (req, res) => {
    try { 
        let maHieuXe=req.body.maHieuXe;
        let hieuxe=await HieuXeService.findOne({maHieuXe:maHieuXe});
        if(hieuxe===null){
            return res.status(404).json(errorResponse("Không tìm thấy hiệu xe"));
        }
        await HieuXeService.deleteOne({maHieuXe:maHieuXe});
        return res.status(200).json(successResponse("Xóa hiệu xe thành công"));
    } catch(err) {
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra. Vui lòng thử lại"));
    }
}

const create = async (req, res) => {
    try { 
        let data=req.body;
        if(data){
            var listHieuXe=await HieuXeService.findAll();
            let flag=0;
            //console.log(listHieuXe)
            listHieuXe.forEach((item)=>{
                let index=item.tenHieuXe.toLowerCase().indexOf(data.tenHieuXe.toLowerCase());
                if(index>-1){
                    flag=1;
                }
            })
            if(flag===1){
                return res.status(403).json(errorResponse("Tên hiệu xe đã tồn tại"));
            }
            maHieuXe=generateID("HX");
            let newHieuXe={
                ...data,
                maHieuXe
            };

            await HieuXeService.create(newHieuXe);
            return res.status(200).json(successResponse("Tạo thành công"));
        }
        else{
            return res.status(403).json(
                errorResponse("Dữ liệu không hợp lệ")
            );
        }
    } catch(err) {
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra. Vui lòng thử lại"));
    }
}

const getAll = async (req, res) => {
    try { 
        var listHieuXe=await HieuXeService.findAll();
        listHieuXe=listHieuXe.map((item)=>{
            return {maHieuXe:item.maHieuXe,
                    tenHieuXe:item.tenHieuXe}
        })
        
        return res.status(200).json(
            successResponse("Lấy danh sách hiệu xe thành công",{
                listHieuXe:listHieuXe
            }));
            
        } catch(err) {
            return res.status(500).json(
                errorResponse("Đã có lỗi xảy ra. Vui lòng thử lại")
            );
    }
}

module.exports = {

    create,
    deleteOne,
    getAll
}