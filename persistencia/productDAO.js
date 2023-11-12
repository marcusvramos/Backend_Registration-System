import Product from "../model/product.js";
import Category from "../model/category.js";
import conectar from "./conexao.js";
import Provider from "../model/provider.js";

export default class ProductDAO {
  async gravar(product) {
    if (product instanceof Product) {
      const sql = `INSERT INTO product(
        prod_name, 
        prod_description,
        prod_unitPrice,
        prod_stockQuantity,
        prod_brand, 
        prod_model, 
        prod_manufacturingDate, 
        cat_id, 
        sup_id) VALUES(?,?,?,?,?,?,?,?,?)`;
      const parametros = [
        product.name,
        product.description,
        product.unitPrice,
        product.stockQuantity,
        product.brand,
        product.model,
        product.manufacturingDate,
        product.category.id,
        product.provider.id,
      ];

      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);
      product.id = retorno[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    }
  }
  async atualizar(product) {
    if (product instanceof Product) {
      const sql = `UPDATE product SET prod_name = ?, prod_description = ?,
            prod_unitPrice = ?, prod_stockQuantity = ?, prod_brand = ?, prod_model = ?, prod_manufacturingDate = ?,
            cat_id = ? , sup_id = ?
            WHERE prod_id = ?`;
      const parametros = [
        product.name,
        product.description,
        product.unitPrice,
        product.stockQuantity,
        product.brand,
        product.model,
        product.manufacturingDate,
        product.category.id,
        product.provider.id,
        product.id,
      ];

      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(product) {
    if (product instanceof Product) {
      const sql = `DELETE FROM product WHERE prod_id = ?`;
      const parametros = [product.id];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(termo) {
    termo = termo ?? ""; // Use termo ou uma string vazia se termo for nulo

    const conexao = await conectar();
    const listaProducts = [];

    let sql;
    let parametros;

    if (termo === "") {
      // Se o termo for vazio, selecionar todos os registros
      sql = `
        SELECT 
          p.prod_id, p.prod_name, p.prod_description,
          p.prod_unitPrice, p.prod_stockQuantity, p.prod_brand, 
          p.prod_model, p.prod_manufacturingDate,
          c.cat_id, c.cat_name, c.cat_description,
          s.sup_id, s.sup_document, s.sup_name, s.sup_phoneNumber,
          s.sup_email, s.sup_website, s.sup_description
        FROM 
          product p
          INNER JOIN category c ON p.cat_id = c.cat_id
          INNER JOIN supplier s ON p.sup_id = s.sup_id
        ORDER BY 
          p.prod_description
      `;
      parametros = [];
    } else {
      // Se o termo não for vazio, ajustar a consulta conforme antes
      sql = `
        SELECT 
          p.prod_id, p.prod_name, p.prod_description,
          p.prod_unitPrice, p.prod_stockQuantity, p.prod_brand, 
          p.prod_model, p.prod_manufacturingDate,
          c.cat_id, c.cat_name, c.cat_description,
          s.sup_id, s.sup_document, s.sup_name, s.sup_phoneNumber,
          s.sup_email, s.sup_website, s.sup_description
        FROM 
          product p
          INNER JOIN category c ON p.cat_id = c.cat_id
          INNER JOIN supplier s ON p.sup_id = s.sup_id
        WHERE 
          ${isNaN(Number(termo)) ? "p.prod_name LIKE ?" : "p.prod_id = ?"}
        ORDER BY 
          ${isNaN(Number(termo)) ? "p.prod_name" : "p.prod_description"}
      `;
      parametros = isNaN(Number(termo)) ? [`%${termo}%`] : [termo];
    }

    const [registros, campos] = await conexao.execute(sql, parametros);

    for (const registro of registros) {
      const categoria = new Category(
        registro.cat_id,
        registro.cat_name,
        registro.cat_description
      );
      const provider = new Provider(
        registro.sup_id,
        registro.sup_document,
        registro.sup_name,
        registro.sup_phoneNumber,
        registro.sup_email,
        registro.sup_website,
        registro.sup_description
      );
      const produto = new Product(
        registro.prod_id,
        registro.prod_name,
        registro.prod_description,
        registro.prod_unitPrice,
        registro.prod_stockQuantity,
        registro.prod_brand,
        registro.prod_model,
        registro.prod_manufacturingDate,
        categoria,
        provider
      );
      listaProducts.push(produto);
    }

    return listaProducts;
  }
}
