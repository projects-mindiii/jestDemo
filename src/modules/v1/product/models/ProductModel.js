import BaseModel from '~/models/BaseModel'
import tableConstants from '~/constants/tableConstants'
import commonConstants from '~/constants/commonConstants'
import knexJs from "knex";
import knexConfig from "~/config/knexfile";
import { product } from '../routes';
import { isEmpty } from 'lodash';
const knex = knexJs(knexConfig);
const baseModelObj = new BaseModel();


export default class ProductModel extends BaseModel{
    insertProductDetail = async(productData)=>{
        try {
            const returnData = await this.createObj(productData, tableConstants.USERS_PRODUCTS);
            return returnData;
        } catch (error) {
            return error;
        }
    }
    getAllProducts = async()=>{
        try {
            const returnData = await knex.select('*').from(tableConstants.USERS_PRODUCTS);
            return returnData;
        } catch (error) {
            return error;
        }
    }

    updateProduct = async(productData)=>{
        try {
            const getProduct = await knex.select('*').from(tableConstants.USERS_PRODUCTS).where({ id: productData.id });
            if(isEmpty(getProduct)) return -1;
            const returnData = await knex(tableConstants.USERS_PRODUCTS)
            .where({ id: productData.id })
            .update({ 
                p_name:productData.name,
                price:productData.price,
                updated_at:productData.updated_at
            });
            return returnData;
        } catch (error) {
            return error;
        }
    }

    deleteProduct = async(productId)=>{
        try {
            const returnData = await this.deleteObj({'id':productId}, tableConstants.USERS_PRODUCTS);
            return returnData;
        } catch (error) {
            return error;
        }
    }

    getProduct = async(productId)=>{
        try {
            const returnData = await this.fetchObjWithSingleRecord({'id':productId},"*",tableConstants.USERS_PRODUCTS);
            return returnData;
        } catch (error) {
            return error;
        }
    }
}