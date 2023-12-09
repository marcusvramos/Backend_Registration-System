import { Router } from "express";
import CategoryController from "../controller/category-controller.js";

const categoryRoute = new Router();
const controller = new CategoryController();

categoryRoute
  .post("/", controller.post)
  .put("/:code", controller.put)
  .delete("/:code", controller.delete)
  .get("/:id", controller.get)
  .get("/", controller.get);

export default categoryRoute;
