import { Router } from "express";
import ProductController from "../controller/product-controller.js";

const productRoute = new Router();
const controller = new ProductController();

productRoute
  .post("/", controller.post)
  .put("/:id", controller.put)
  .delete("/:id", controller.delete)
  .get("/:id", controller.get)
  .get("/", controller.get);

export default productRoute;
