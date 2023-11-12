import { Router } from "express";
import ProductController from "../controller/product-controller.js";

const productRoute = new Router();
const controller = new ProductController();

productRoute.post("/", controller.post);
productRoute.put("/:id", controller.put);
productRoute.delete("/:id", controller.delete);
productRoute.get("/", controller.get);
productRoute.get("/:id", controller.get);

export default productRoute;
