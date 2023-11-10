import { Router } from "express";
import CategoryController from "../controller/category-controller.js";

const categoryRoute = new Router();
const controller = new CategoryController();

categoryRoute.post("/", controller.post);
categoryRoute.get("/", controller.consultar);
categoryRoute.put("/", controller.atualizar);
categoryRoute.delete("/", controller.delete)

export default categoryRoute;