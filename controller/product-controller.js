import Category from "../model/category.js";
import Product from "../model/product.js";
import Provider from "../model/provider.js";

export default class ProductController {
  post(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      try {
        const {
          name,
          description,
          unitPrice,
          stockQuantity,
          brand,
          model,
          manufacturingDate,
          categoryId,
          providerDocument,
        } = req.body;
        if (
          name &&
          description &&
          unitPrice &&
          stockQuantity &&
          brand &&
          model &&
          manufacturingDate &&
          categoryId &&
          providerDocument
        ) {
          let category, provider;

          const categoriaPromise = new Category(categoryId).consultar(
            categoryId
          );
          const provedorPromise = new Provider().consultar(providerDocument);

          categoriaPromise.then((resposta) => {
            category = resposta[0];

            provedorPromise.then((resposta) => {
              provider = resposta[0];

              if (!category || !provider) {
                return res.status(400).send({
                  status: false,
                  message: "Categoria ou Fornecedor informado é inválido!",
                });
              }

              const product = new Product(
                0,
                name,
                description,
                unitPrice,
                stockQuantity,
                brand,
                model,
                manufacturingDate,
                category,
                provider
              );

              product
                .gravar()
                .then(() => {
                  res.status(200).send({
                    status: true,
                    message: "Produto cadastrado!",
                  });
                })
                .catch((e) => {
                  res.status(500).send({
                    status: false,
                    message: e,
                  });
                });
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
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos POST para cadastrar um produto!",
      });
    }
  }

  put = async (req, res) => {
    res.type("application/json");
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.is("application/json")
    ) {
      const {
        name,
        description,
        unitPrice,
        stockQuantity,
        brand,
        model,
        manufacturingDate,
        categoryId,
        providerDocument,
      } = req.body;
      const {id} = req.params;
      if (
        id &&
        name &&
        description &&
        unitPrice &&
        stockQuantity &&
        brand &&
        model &&
        manufacturingDate &&
        categoryId &&
        providerDocument
      ) {
        let category, provider;

        const categoriaPromise = new Category(categoryId).consultar(categoryId);
        const provedorPromise = new Provider().consultar(providerDocument);

        categoriaPromise.then((resposta) => {
          category = resposta[0];

          provedorPromise.then((resposta) => {
            provider = resposta[0];

            if (!category || !provider) {
              return res.status(400).send({
                status: false,
                message: "Categoria ou Fornecedor informado é inválido!",
              });
            }

            const product = new Product(
              id,
              name,
              description,
              unitPrice,
              stockQuantity,
              brand,
              model,
              manufacturingDate,
              category,
              provider
            );

            product
              .atualizar()
              .then(() => {
                res.status(200).send({
                  status: true,
                  message: "Produto atualizado!",
                });
              })
              .catch((e) => {
                res.status(500).send({
                  status: false,
                  message: e,
                });
              });
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
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um produto!",
      });
    }
  };

  delete(req, res) {
    res.type("application/json");
    if (req.method === "DELETE") {
      const { id } = req.params;
      if (id) {
        const product = new Product(id);
        product
          .excluir()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Produto excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o produto:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o documento do produto!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir um produto!",
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

      const product = new Product();
      product
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
