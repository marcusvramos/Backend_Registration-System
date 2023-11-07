import Category from "../model/category.js";

export default class CategoryController {

    post(req,res){
        res.type("application/json");
        if(req.method === "POST" && req.is("application/json")){
            try{
                const {name,description} = req.body;
                if(name && description){
                    const category = new Category(0,name,description);
                    category.gravar().then(()=>{
                        res.status(200).send({
                            status:true,
                            message: "Categoria cadastrada!"
                        })
                    }).catch((e) => {
                        res.status(500).send({
                            status:false,
                            message: e
                        });
                    })
                }
                else{
                    return res.status(400).send({
                        status:false,
                        message: "Informe todos os dados!"
                    })
                }
            } catch(e){
                return res.status(400).send({
                    status:false,
                    message:e
                });
            }
        }else
            return res.status(400).send();
    }

}