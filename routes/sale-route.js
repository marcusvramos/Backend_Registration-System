import { Router } from "express";
import SaleController from "../controller/sale-controller.js";

const saleRoute = new Router();
const controller = new SaleController();

saleRoute
  .post("/", controller.post)
  .put("/:id", controller.put)
  .delete("/:id", controller.delete)
  .get("/:id", controller.get)
  .get("/", controller.get);

export default saleRoute;
