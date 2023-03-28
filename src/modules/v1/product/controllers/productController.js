import productService from "../services/productService";
import { sendResponse, sendErrorResponse } from "~/middlewares/responseHandler";
import customResponseCode from '~/constants/customResponseCode';
import statusCode from "http-status-codes";
import BaseModel from "~/models/BaseModel";
import logger from "~/utils/logger";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';




// var baseModelObj = new BaseModel();
var productServiceObj = new productService();

const createProduct = async(req, res, next)=>{
    productServiceObj.createProductService(req).then(async(returnData)=>{
        switch (returnData.status_code) {
            case statusCode.OK:
                var responseData = {};
                responseData.status_code = statusCode.OK;
                responseData.message     = 'Product created successfully!';
                responseData.data        = returnData.response;
                sendResponse(req, res, statusCode.OK, responseData);    
                break;
            default:
                var responseData = {};
                responseData.status_code = customResponseCode.DB_ERROR;
                responseData.message     = 'Product not created!';
                responseData.data        = returnData.response;
                sendResponse(req, res, customResponseCode.DB_ERROR, responseData);
                break;
        }

    }).catch((err)=>{
        sendErrorResponse(req, res, statusCode.INTERNAL_SERVER_ERROR);
    })
}

const getAllProducts = async(req, res, next)=>{
    productServiceObj.getAll(req).then(async(returnData)=>{
        var responseData = {};
        if(returnData.status_code==statusCode.OK){
            responseData.status_code = statusCode.OK;
            responseData.message     = 'Product fetched successfully!';
            responseData.data        = returnData.response;
            sendResponse(req, res, statusCode.OK, responseData);
        }else{
            responseData.status_code = customResponseCode.DB_ERROR;
            responseData.message     = 'Product not fetched!';
            responseData.data        = '';
            sendResponse(req, res, customResponseCode.DB_ERROR, responseData);
        }
    }).catch((err)=>{
        sendErrorResponse(req, res, statusCode.INTERNAL_SERVER_ERROR);
    })
}

const updateProduct = async(req, res, next)=>{
    const productData = {
        'id':req.params.id,
        'p_name':req.body.name,
        'price':req.body.price
    }
    productServiceObj.updateProduct(productData).then(async(returnData)=>{
        var responseData = {};
        if(returnData.status_code==statusCode.OK){
            responseData.status_code = statusCode.OK;
            responseData.message = "Product updated successfully!";
            responseData.data    = returnData.response;
            sendResponse(req, res, statusCode.OK, responseData);
        }else if(returnData.status_code==customResponseCode.NO_RECORD_FOUND){
            responseData.status_code = customResponseCode.NO_RECORD_FOUND;
            responseData.message = returnData.response;
            responseData.data    = '';
            sendResponse(req, res, customResponseCode.NO_RECORD_FOUND, responseData);
        }else{
            responseData.status_code = customResponseCode.DB_ERROR;
            responseData.message = "Product not updated!";
            responseData.data    = returnData.response;
            sendResponse(req, res, customResponseCode.DB_ERROR, responseData);
        }
    }).catch((err)=>{
        logger.error(err);
        sendErrorResponse(req, res, statusCode.INTERNAL_SERVER_ERROR);
    });
}

const deleteProduct = async(req, res, next)=>{

    productServiceObj.deleteProduct(req.params.id).then(async(returnData)=>{
        const responseData = {};
        if(returnData.status_code==statusCode.OK){
            responseData.status_code = statusCode.OK;
            responseData.message = "Product deleted successfully!";
            responseData.data    = returnData.response;
            sendResponse(req, res, statusCode.OK, responseData);
        }else{
            responseData.status_code = customResponseCode.NO_RECORD_FOUND;
            responseData.message = returnData.response;
            responseData.data    = '';
            sendResponse(req, res, customResponseCode.NO_RECORD_FOUND, responseData);
        }
    }).catch((err)=>{
        logger.error(err);
        console.log(err);
    })
}

const getProduct = async(req, res, next)=>{
    productServiceObj.getProduct(req.params.id).then(async(returnData)=>{
        const responseData = {};
        if(returnData.status_code==statusCode.OK){
            responseData.status_code = statusCode.OK;
            responseData.message = "Product fetched successfully!";
            responseData.data    = returnData.response;
            sendResponse(req, res, statusCode.OK, responseData);
        }else{
            responseData.status_code = customResponseCode.NO_RECORD_FOUND;
            responseData.message = returnData.response;
            responseData.data    = '';
            sendResponse(req, res, customResponseCode.NO_RECORD_FOUND, responseData);
        }
    }).catch((err)=>{
        logger.error(err);
        sendErrorResponse(req, res, statusCode.INTERNAL_SERVER_ERROR);
    })
}

const uploadProductImage = async(req, res, next)=>{
    if(!req.files){
        res.status(400).send({'message':'file not found!'});
        console.log(`file not found!`);
    }
    
    const file = req.files.image;
    const uniqueName = uuidv4();
    file.name = uniqueName+path.extname(file.name);

    const uploadPath = `/home/mspc-26/Downloads/node-yarn-project-structure-v2/src/uploadFiles/${file.name}`;
    
    file.mv(uploadPath,(err)=>{
        if(err){
            res.status(400).send({'message':`error in file uploading ${err}`});
        }

        const productImgObj = {
            "image_name":file.name,
            "image_path":uploadPath
        }

        productServiceObj.saveProductImage(productImgObj).then(async(returnData)=>{
            const responseData = {};
            if(returnData.status_code==statusCode.OK){
                responseData.status_code = statusCode.OK;
                responseData.message = returnData.response;
                responseData.data    = returnData.data;
                sendResponse(req, res, statusCode.OK, responseData);
            }else{
                responseData.status_code = customResponseCode.NO_RECORD_FOUND;
                responseData.message = returnData.response;
                responseData.data    = '';
                sendResponse(req, res, customResponseCode.NO_RECORD_FOUND, responseData);
            }
        }).catch((err)=>{
            logger.error(err);
            sendErrorResponse(req, res, statusCode.INTERNAL_SERVER_ERROR);
        })

    });
    
}

const productController = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProduct,
    uploadProductImage
}

export default productController;
