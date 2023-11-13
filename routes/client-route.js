import { Router } from "express";
import ClientController from "../controller/client-controller.js";

const categoryRoute = new Router();
const controller = new ClientController();

categoryRoute.post("/", controller.post);
categoryRoute.put("/:id", controller.put);
categoryRoute.delete("/:id", controller.delete);
categoryRoute.get("/", controller.get);
categoryRoute.get("/:id", controller.get);

export default categoryRoute;
