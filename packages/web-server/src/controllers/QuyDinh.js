const {generateID}=require('../helpers/generateID')
const QuyDinhService = require('../services/QuyDinh');
const HieuXeService = require('../services/HieuXe');
const LoaiVatTuService = require('../services/LoaiVatTu');
const {mutipleMongooseToObject,mongooseToObject} =require('../utils/mongoose')
const {successResponse,errorResponse}= require('../utils/objResponse');

// const { findOne, create, deleteOne } = require('../configs/controller.template.config')(QuyDinh);

const get = async (req, res) => {
    try { 
        let oldListQuyDinh = await QuyDinhService.find();
        if(oldListQuyDinh&& oldListQuyDinh.length>0){
            lstQuyDinh=mutipleMongooseToObject(oldListQuyDinh);
            let listHieuXe=await HieuXeService.findAll();
            let listLoaiVatTu=await LoaiVatTuService.findAll();
            lstQuyDinh=lstQuyDinh.map(item=>{
                return {
                    maQuyDinh:item.maQuyDinh,
                    soXeMax:item.soXeMax,
                    soHieuXe:listHieuXe.length,
                    soLoaiVatTu:listLoaiVatTu.length
                }
            })
            let objQuyDinh=lstQuyDinh[0];
            res.status(200).json(successResponse("Lấy danh sách thành công",{quyDinh:objQuyDinh}));
            
        }else{
           await QuyDinhService.create(req.body);
           return res.status(200).json(successResponse("Tạo quy định thành công"));
        }
    } catch(err) {
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra vui lòng thử lại"))
    }
}

const update = async (req, res) => {
    try { 
        let data=req.body;
        let oldListQuyDinh = await QuyDinhService.find();
        if(oldListQuyDinh&& oldListQuyDinh.length>0){
            let oldQuyDinh =await QuyDinhService.findOne({maQuyDinh:data.maQuyDinh});
            if(oldQuyDinh){
                await QuyDinhService.update({maQuyDinh:data.maQuyDinh},data)
                return res.status(200).json(successResponse("Cập nhật quy định thành công"));
            }else{
            res.status(403).json(errorResponse( 'Không tìm thấy quy định này.'));
            } 
     
        }else{
            let id=generateID("QD");
            data={
                ...data,
                maQuyDinh:id,
            }
           await QuyDinhService.create(data);
           return res.status(200).json(successResponse("Tạo quy định thành công"));
        }
    } catch(err) {
        return res.status(500).json(errorResponse( `Đã có lỗi xảy ra. Vui lòng thử lại.`));
    }
}
module.exports = {
    update,
    get
}