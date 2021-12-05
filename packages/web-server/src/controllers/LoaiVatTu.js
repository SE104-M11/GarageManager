const { LoaiVatTu } = require('../models');
const LoaiVatTuService = require('../services/LoaiVatTu');
const {generateID}= require('../helpers/generateID');
const {successResponse,errorResponse}= require('../utils/objResponse');

const deleteOne = async (req, res) => {
    try { 
        let maLoaiVatTu=req.body.maLoaiVatTu;
        let LoaiVatTu=await LoaiVatTuService.findOne({maLoaiVatTu:maLoaiVatTu});
        if(LoaiVatTu===null){
            return res.status(404).json(errorResponse("Không tìm thấy loại vật tư"));
        }
        await LoaiVatTuService.deleteOne({maLoaiVatTu:maLoaiVatTu});
        return res.status(200).json(successResponse("Xóa loại vật tư thành công"));
    } catch(err) {
        return res.status(500).json(errorResponse("Đã có lỗi xảy ra. Vui lòng thử lại"));
    }
}

const create = async (req, res) => {
    try { 
        let data=req.body;
        if(data){
            var listLoaiVatTu=await LoaiVatTuService.findAll();
            let flag=0;
            //console.log(listLoaiVatTu)
            listLoaiVatTu.forEach((item)=>{
                let index=item.tenLoaiVatTu.toLowerCase().indexOf(data.tenLoaiVatTu.toLowerCase());
                if(index>-1){
                    flag=1;
                }
            })
            if(flag===1){
                return res.status(403).json(errorResponse("Tên loại vật tư đã tồn tại"));
            }
            maLoaiVatTu=generateID("LVT");
            let newLoaiVatTu={
                ...data,
                maLoaiVatTu
            };
            

            await LoaiVatTuService.create(newLoaiVatTu);
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
        var listLoaiVatTu=await LoaiVatTuService.findAll();
        listLoaiVatTu=listLoaiVatTu.map((item)=>{
            return {maLoaiVatTu:item.maLoaiVatTu,
                    tenLoaiVatTu:item.tenLoaiVatTu,
                    idVatTu: item._id}
        })
        
        return res.status(200).json(
            successResponse("Lấy danh sách loại vật tư thành công",{
                listLoaiVatTu:listLoaiVatTu
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