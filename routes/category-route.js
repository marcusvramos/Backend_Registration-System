import { Router } from "express";
import CategoryController from "../controller/category-controller.js";

const categoryRoute = new Router();
const controller = new CategoryController();

categoryRoute.post("/", controller.post);
categoryRoute.put("/:code", controller.put);
categoryRoute.delete("/:code", controller.delete);
categoryRoute.get("/", controller.get);
categoryRoute.get("/:id", controller.get);

export default categoryRoute;
