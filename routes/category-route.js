import { Router } from "express";
import CategoryController from "../controller/category-controller.js";

const categoryRoute = new Router();
const controller = new CategoryController();

categoryRoute.post("/", controller.post);

export default categoryRoute;