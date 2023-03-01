//TODO add validator
import { Router } from "express";
import productController from "!/product/controllers/productController";
import { productValidator } from "!/product/validators/productValidator";


// create object for product controller routes
const product = new Router();
/*
 * create routes for create product method in productController
 */
product.post("/create",productValidator,productController.createProduct);
/*
 * create routes for getting all product method in productControllers
 */
product.get("/get-all",productController.getAllProducts);
/*
 * create routes for update product method in productControllers
 */
product.put("/updateProduct/:id",productValidator,productController.updateProduct);
/*
 * create routes for delete product method in productControllers
 */
product.delete("/deleteProduct/:id",productController.deleteProduct);
/*
 * create routes for getting single product method in productControllers
 */
product.get("/get/:id",productController.getProduct);



export {
    product
};