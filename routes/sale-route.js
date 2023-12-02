import { Router } from "express";
import SaleController from "../controller/sale-controller.js";


const saleRoute = new Router();
const controller = new SaleController();

saleRoute.post("/", controller.post);
saleRoute.put("/:id", controller.put);
saleRoute.delete("/:id", controller.delete);
saleRoute.get("/", controller.get);
saleRoute.get("/:id", controller.get);

export default saleRoute;