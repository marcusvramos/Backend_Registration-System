import { Router } from "express";
import PurchaseController from "../controller/purchase-controller.js";


const puchaseRoute = new Router();
const controller = new PurchaseController();

puchaseRoute.post("/", controller.post);
puchaseRoute.put("/:id", controller.put);
puchaseRoute.delete("/:id", controller.delete);
puchaseRoute.get("/", controller.get);
puchaseRoute.get("/:id", controller.get);

export default puchaseRoute;