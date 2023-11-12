import { Router } from "express";
import ProviderController from "../controller/provider-controller.js";

const providerRoute = new Router();
const controller = new ProviderController();

providerRoute.post("/", controller.post);
providerRoute.put("/:document", controller.put);
providerRoute.delete("/:document", controller.delete);
providerRoute.get("/", controller.get);
providerRoute.get("/:document", controller.get);

export default providerRoute;
