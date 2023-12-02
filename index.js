import express from "express";
import cors from "cors";
import categoryRoute from "./routes/category-route.js";
import providerRoute from "./routes/provider-route.js";
import productRoute from "./routes/product-route.js";
import clientRoute from './routes/client-route.js';
import purchaseRoute from "./routes/purchase-route.js";
import saleRoute from "./routes/sale-route.js";
const app = express();

app.use(
  cors({
    origins: "*",
    methods: "GET,HEAD,PATCH,POST,DELETE,PUT",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/category", categoryRoute);
app.use("/provider", providerRoute);
app.use("/product", productRoute);
app.use("/client", clientRoute);
app.use("/purchase", purchaseRoute );
app.use("/sale", saleRoute );

app.get("/", (req, res) => {
  res.send("Olá");
});

app.listen(4000);
