import Client from "../model/client.js";
import conectar from "./conexao.js";

export default class ClientDAO {
  async gravar(client) {
    if (client instanceof Client) {
      const sql =
        "INSERT INTO client(cli_document, cli_name, cli_neighborhood, cli_address, cli_city, cli_uf, cli_number, cli_zipCode) \
        VALUES(?, ?, ? , ?, ?, ?, ?, ?)";
      const parametros = [
        client.document,
        client.name,
        client.neighborhood,
        client.address,
        client.city,
        client.uf,
        client.number,
        client.zipCode,
      ];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);

      client.id = retorno[0].insertId;

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(client) {
    if (client instanceof Client) {
      const sql =
        "UPDATE client SET cli_document = ?, cli_name = ?, cli_neighborhood = ?\
        cli_address = ?, cli_city = ?, cli_uf = ?, cli_number = ?, cli_zipCode = ? WHERE cli_id = ?";
      const parametros = [
        client.document,
        client.name,
        client.neighborhood,
        client.address,
        client.city,
        client.uf,
        client.number,
        client.zipCode,
        client.id,
      ];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(client) {
    if (client instanceof Client) {
      const sql = "DELETE FROM client WHERE cli_id = ?";
      const parametros = [client.id];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametrosDaConsulta) {
    let sql = "";
    let parametros = [];
    if (!isNaN(parseInt(parametrosDaConsulta))) {
      sql = "SELECT * FROM client WHERE cli_id = ? order by cli_name";
      parametros = [parametrosDaConsulta];
    } else if (parametrosDaConsulta != "") {
      sql = "SELECT * FROM client WHERE cli_name like ?";
      parametros = [`%${parametrosDaConsulta}%`];
    } else {
      sql = "SELECT * FROM client order by cli_name";
      parametros = [""];
    }

    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaCategorias = [];
    for (const registro of registros) {
      const categoria = new client(
        registro.cat_id,
        registro.cat_name,
        registro.cat_description
      );
      listaCategorias.push(categoria);
    }

    return listaCategorias;
  }
}
