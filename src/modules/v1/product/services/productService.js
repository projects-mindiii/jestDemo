import ProductModel from "../models/ProductModel";
import tableConstants from '~/constants/tableConstants';
import commonConstants from '~/constants/commonConstants';
import customResponseCode from '~/constants/customResponseCode';
import {
    StatusCodes
} from "http-status-codes";
import commonHelpers from '~/helpers/commonHelpers'
import DateTimeUtil from "~/utils/DateTimeUtil";
import passwordHash from "~/utils/passwordHash";

import logger from "~/utils/logger";
const ProductModelObj = new ProductModel();


const currentTime = DateTimeUtil.getCurrentTimeObjForDB();

export default class productService{

    async createProductService(req){
        const productData = {
            "p_name":req.body.name,
            "price" :req.body.price,
            "created_at":currentTime
        }
        try {
            const res = await ProductModelObj.insertProductDetail(productData);
            if(res!=undefined){
                const rsp = {
                    status:true,
                    status_code:StatusCodes.OK,
                    response:{"p_name":req.body.name,
                              "price" :req.body.price
                             }
                }
                return rsp;
            }else{
                const rsp = {
                    status:false,
                    status_code:customResponseCode.DB_ERROR,
                    response:''
                }
                return rsp;
            }
            
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async getAll(){
        try {
            const products = await ProductModelObj.getAllProducts();
            if(products!=undefined){
                return {
                    status:true,
                    status_code:StatusCodes.OK,
                    response:products
                }
            }else{
                return {
                    status:false,
                    status_code:customResponseCode.DB_ERROR,
                    response:''
                }
            }
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async updateProduct(productData){
        try {
            productData.updated_at = currentTime;
            const res = await ProductModelObj.updateProduct(productData);
            
            if(res!=undefined && res==1){
                return {
                    status:true,
                    status_code:StatusCodes.OK,
                    response:productData
                }
            }else if(res==-1){
                return {
                    status:false,
                    status_code:customResponseCode.NO_RECORD_FOUND,
                    response:'Product not found!'
                }
            }else{
                return {
                    status:false,
                    status_code:customResponseCode.DB_ERROR,
                    response:''
                }
            }
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async deleteProduct(productId){
        try {
            const res = await ProductModelObj.deleteProduct(productId);
            if(res!=undefined && res==1){
                const res = await ProductModelObj.deleteProduct(productId);
                return {
                    status:true,
                    status_code:StatusCodes.OK,
                    response:''
                }
            }else{
                return {
                    status:false,
                    status_code:customResponseCode.NO_RECORD_FOUND,
                    response:'Product not found!'
                }
            }
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async getProduct(productId){
        try {
            const res = await ProductModelObj.getProduct(productId);
            if(res!=undefined){
                return {
                    status:true,
                    status_code:StatusCodes.OK,
                    response:res
                }
            }else{
                return {
                    status:false,
                    status_code:customResponseCode.NO_RECORD_FOUND,
                    response:'Product not found!'
                }
            }
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async saveProductImage(productImage){
        try {
            const res = await ProductModelObj.saveProductImg(productImage);

            if(res!=undefined && res!=0){
                const id = [...res].shift();
                const insertedFile = await ProductModelObj.getFileRecord(id);
                
                return {
                    status:true,
                    status_code:StatusCodes.OK,
                    response:'File uploaded successfully',
                    data:JSON.parse(JSON.stringify(insertedFile))
                }
            }else{
                return {
                    status:false,
                    status_code:customResponseCode.NO_RECORD_FOUND,
                    response:'Product image could not save!'
                }
            }
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

}