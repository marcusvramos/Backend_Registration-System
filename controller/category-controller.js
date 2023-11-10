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

    async atualizar(req,res){
        res.type("application/json");
        if(req.method === "PUT" || req.method === "PATCH"){
            const {id, name, description} = req.body;
            if(id, name && description){
                const category = new Category(id,name,description);
                category.atualizar().then(()=>{
                    res.status(200).send({
                        status: true,
                        message: "Categoria atualizada"
                    })
                }).catch((e)=>{
                    res.status(500).send({
                        status:false,
                        message: e
                    })
                }) 
            }else{
                res.status(400).send({
                    status:false,
                    message: "Informe todos os dados"
                })
            }
        }
    }

    excluir(req,res){
        res.type("application/json");
         if(req.method === "DELETE"){
            const {id} = red.body;
            if(id){
                const category = new Category(id);
                category.excluir().then(()=>{
                    res.status(200).send({
                        status:true,
                        message: "Categoria excluida"
                    });
                }).catch((e)=>{
                    res.status(500).send({
                        status:false,
                        message: e
                    });
                });
            }
            else{
                res.status.send({
                    status:false,
                    message: "Informe o id"
                });
            }
         }
    }

    consultar(req,res){
        res.type("application/json");
        if(req.method === "GET"){
            const {description, id} = req.params;
            const parametro = id ?? description;
            const category = new Category();
            category.consultar(parametro).then((lista)=>{
                res.status(200).send({
                    status:true,
                    message: "Consulta realizada",
                    lista: lista
                })
            }).catch((e)=>{
                res.status(500).send({
                    status:false,
                    message: e
                })
            })
        }
    }

}