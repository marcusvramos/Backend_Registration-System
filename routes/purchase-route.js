import { Router } from "express";
import PurchaseController from "../controller/purchase-controller.js";

const puchaseRoute = new Router();
const controller = new PurchaseController();

puchaseRoute
  .post("/", controller.post)
  .put("/:id", controller.put)
  .delete("/:id", controller.delete)
  .get("/:id", controller.get)
  .get("/", controller.get);

export default puchaseRoute;
