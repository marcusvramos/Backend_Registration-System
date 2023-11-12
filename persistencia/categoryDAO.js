import Category from "../model/category.js";
import conectar from "./conexao.js";

export default class CategoryDAO {
  async gravar(category) {
    if (category instanceof Category) {
      const sql =
        "INSERT INTO category(cat_name, cat_description) VALUES(?, ?)";
      const parametros = [category.name, category.description];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);

      category.id = retorno[0].insertId;

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(category) {
    if (category instanceof Category) {
      const sql =
        "UPDATE category SET cat_name = ?, cat_description = ? WHERE cat_id = ?";
      const parametros = [category.name, category.description, category.id];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(category) {
    if (category instanceof Category) {
      const sql = "DELETE FROM category WHERE cat_id = ?";
      const parametros = [category.id];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametrosDaConsulta) {
    let sql = "";
    let parametros = [];
    if (!isNaN(parseInt(parametrosDaConsulta))) {
      sql = "SELECT * FROM category WHERE cat_id = ? order by cat_description";
      parametros = [parametrosDaConsulta];
    } else {
      if (!parametrosDaConsulta) {
        parametrosDaConsulta = "";
      } else {
        sql = "SELECT * FROM category WHERE cat_name like ?";
        parametros = [`%${parametrosDaConsulta}%`];
      }
    }

    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaCategorias = [];
    for(const registro of registros){
        const categoria = new Category(registro.cat_id, registro.cat_name, registro.cat_description);
        listaCategorias.push(categoria);
    }

    return listaCategorias;
  }
}
