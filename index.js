import express from "express";
import cors from "cors";
import categoryRoute from "./routes/category-route.js";
import providerRoute from "./routes/provider-route.js";
import productRoute from "./routes/product-route.js";
import clientRoute from "./routes/client-route.js";
import purchaseRoute from "./routes/purchase-route.js";
import saleRoute from "./routes/sale-route.js";
const host = "0.0.0.0";
const porta = 4000;

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/category", categoryRoute);
app.use("/provider", providerRoute);
app.use("/product", productRoute);
app.use("/client", clientRoute);
app.use("/purchase", purchaseRoute);
app.use("/sale", saleRoute);

app.listen(porta, host, () => {
  console.log(`API do sistema em execução: ${host}:${porta}`);
});
