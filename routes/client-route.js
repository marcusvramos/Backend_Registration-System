import { Router } from "express";
import ClientController from "../controller/client-controller.js";

const clientRoute = new Router();
const controller = new ClientController();

clientRoute
  .post("/", controller.post)
  .put("/:id", controller.put)
  .delete("/:id", controller.delete)
  .get("/:id", controller.get)
  .get("/", controller.get);

export default clientRoute;
