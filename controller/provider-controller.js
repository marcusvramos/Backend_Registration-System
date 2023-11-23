import Provider from "../model/provider.js";

export default class ProviderController {
  post(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      try {
        const { document, name, phoneNumber, email, website, description } =
          req.body;
        if (
          document &&
          name &&
          phoneNumber &&
          email &&
          website &&
          description
        ) {
          const provider = new Provider(
            0,
            document,
            name,
            phoneNumber,
            email,
            website,
            description
          );
          provider
            .gravar()
            .then(() => {
              res.status(200).send({
                status: true,
                message: "Fornecedor cadastrado!",
                provider
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
      const { document } = req.params;
      const { name, phoneNumber, email, website, description } = req.body;
      if (document && name && phoneNumber && email && website && description) {
        const provider = new Provider(
          0,
          document,
          name,
          phoneNumber,
          email,
          website,
          description
        );
        provider
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Fornecedor atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o fornecedor:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe todos os dados!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um fornecedor!",
      });
    }
  }

  delete(req, res) {
    res.type("application/json");
    if (req.method === "DELETE") {
      const { document } = req.params;
      if (document) {
        const provider = new Provider(0, document);
        provider
          .excluir()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Fornecedor excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o fornecedor:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o documento do fornecedor!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método DELETE para excluir um fornecedor!",
      });
    }
  }

  get(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const { name } = req.query;
      const { document } = req.params;
      let parametro = "";
      
      if (name) {
        parametro = name;
      } else if (document) {
        parametro = document;
      }

      const provider = new Provider();
      provider
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
