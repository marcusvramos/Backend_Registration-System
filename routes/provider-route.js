import { Router } from "express";
import ProviderController from "../controller/provider-controller.js";

const providerRoute = new Router();
const controller = new ProviderController();

providerRoute
  .post("/", controller.post)
  .put("/:document", controller.put)
  .delete("/:document", controller.delete)
  .get("/:document", controller.get)
  .get("/", controller.get);

export default providerRoute;
