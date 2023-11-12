import Category from "../model/category.js";

export default class CategoryController {
  post(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      try {
        const { name, description } = req.body;
        if (name && description) {
          const category = new Category(0, name, description);
          category
            .gravar()
            .then(() => {
              res.status(200).send({
                status: true,
                message: "Categoria cadastrada!",
              });
            })
            .catch((e) => {
              res.status(500).send({
                status: false,
                message: e,
              });
            });
        } else {
          return res.status(400).send({
            status: false,
            message: "Informe todos os dados!",
          });
        }
      } catch (e) {
        return res.status(400).send({
          status: false,
          message: e,
        });
      }
    } else return res.status(400).send();
  }

  put(req, res) {
    res.type("application/json");
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.is("application/json")
    ) {
      const { code } = req.params;
      const { name, description } = req.body;
      if (code && name && description) {
        const category = new Category(code, name, description);
        category
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Categoria atualizada com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar a categoria:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o código e a descrição da categoria!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar uma categoria!",
      });
    }
  }

  delete(req, res) {
    res.type("application/json");
    if (req.method === "DELETE") {
      const { code } = req.params;
      if (code) {
        const category = new Category(code);
        category
          .excluir()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Categoria excluída com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao excluir a categoria:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o código da categoria!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método DELETE para excluir uma categoria!",
      });
    }
  }

  get(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const { name } = req.query;
      const { id } = req.params;
      let parametro = "";

      if (name) {
        parametro = name;
      } else if (id) {
        parametro = id;
      }

      const category = new Category();
      category
        .consultar(parametro)
        .then((lista) => {
          res.status(200).send({
            status: true,
            message: "Consulta realizada",
            lista: lista,
          });
        })
        .catch((e) => {
          res.status(500).send({
            status: false,
            message: e,
          });
        });
    }
  }
}
