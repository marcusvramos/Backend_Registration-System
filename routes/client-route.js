import { Router } from "express";
import ClientController from "../controller/client-controller.js";

const clientRoute = new Router();
const controller = new ClientController();

clientRoute.post("/", controller.post);
clientRoute.put("/:id", controller.put);
clientRoute.delete("/:id", controller.delete);
clientRoute.get("/", controller.get);
clientRoute.get("/:id", controller.get);

export default clientRoute;
