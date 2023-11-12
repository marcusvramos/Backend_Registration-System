import Product from "../model/product.js";
import Category from "../model/category.js";
import conectar from "./conexao.js";
import Provider from "../model/provider.js";

export default class ProductDAO {
  async gravar(product) {
    if (product instanceof Product) {
      const sql = `INSERT INTO product(prod_name, prod_description,
                prod_unitPrice, prod_stockQuantity, prod_brand, prod_model, prod_manufacturingDate, cat_id, sup_id)
                VALUES(?,?,?,?,?,?,?,?,?)`;
      const parametros = [
        product.name,
        product.description,
        product.unitPrice,
        product.stockQuantity,
        product.brand,
        product.model,
        product.manufacturingDate,
        product.category.dictionary,
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
        product.category.dictionary,
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
    if (!termo) {
      termo = "";
    }
    //termo é um número
    const conexao = await conectar();
    let listaProducts = [];
    if (!isNaN(Number(termo))) {
      //consulta pelo código do produto
      const sql = `SELECT p.prod_id, p.prod_description,
              p.prod_unitPrice, p.prod_stockQuantity, p.prod_brand, 
              p.prod_model, p.prod_manufacturingDate,
              c.cat_id, c.cat_name, c.cat_description,
              s.sup_id, s.sup_document, s.sup_name, s.sup_phoneNumber,
              s.sup_email, s.sup_website, s.sup_description
              FROM product p
              INNER JOIN categoria c ON p.cat_id = c.cat_id
              INNER JOIN supplier s ON p.sup_id = s.sup_id
              WHERE p.prod_id = ?
              ORDER BY p.prod_description`;

      const parametros = [termo];
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
          registro.prod_quantityInStock,
          registro.prod_brand,
          registro.prod_model,
          registro.prod_manufacturingDate,
          categoria,
          provider
        );
        listaProducts.push(produto);
      }
    } else {
      //consulta pela descrição do produto
      const sql = `SELECT p.prod_id, p.prod_description,
      p.prod_unitPrice, p.prod_stockQuantity, p.prod_brand, 
      p.prod_model, p.prod_manufacturingDate,
      c.cat_id, c.cat_name, c.cat_description,
      s.sup_id, s.sup_document, s.sup_name, s.sup_phoneNumber,
      s.sup_email, s.sup_website, s.sup_description
      FROM product p
      INNER JOIN categoria c ON p.cat_id = c.cat_id
      INNER JOIN supplier s ON p.sup_id = s.sup_id
      WHERE p.prod_descricao like ?
      ORDER BY p.prod_descricao`;

      const parametros = ["%" + termo + "%"];
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
          registro.prod_quantityInStock,
          registro.prod_brand,
          registro.prod_model,
          registro.prod_manufacturingDate,
          categoria,
          provider
        );
        listaProducts.push(produto);
      }
    }

    return listaProducts;
  }
}
