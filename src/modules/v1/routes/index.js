import { Router } from "express";
import { auth } from "../auth/routes";
import { product } from "../product/routes";
const v1routes = new Router();
v1routes.use("/", auth);
v1routes.use("/product", product);


export { v1routes };