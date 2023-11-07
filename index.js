import express  from "express"
import cors from "cors"
import categoryRoute from "./routes/category-route.js"

const app = express()


app.use(cors({
    origins:"*",
    methods:"GET,HEAD,PATCH,POST,DELETE,PUT",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use("/category",categoryRoute);

app.get("/",(req,res)=>{
    res.send("Olá");
})

app.listen(3000);