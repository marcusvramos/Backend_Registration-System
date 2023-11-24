import { Document } from "../entities/document.js";
import Provider from "../model/provider.js";
import conectar from "./conexao.js";

export default class ProviderDAO {
  async gravar(provider) {
    if (provider instanceof Provider) {
      const sql =
        "INSERT INTO supplier(sup_document, sup_name, sup_phoneNumber, sup_email, sup_website, sup_description) VALUES(?, ?, ?, ?, ?, ?)";
      const parametros = [
        provider.document,
        provider.name,
        provider.phoneNumber,
        provider.email,
        provider.website,
        provider.description,
      ];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);

      provider.id = retorno[0].insertId;

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(provider) {
    if (provider instanceof Provider) {
      const sql =
        "UPDATE supplier SET sup_name = ?, sup_phoneNumber = ?, sup_email = ?, sup_website = ?, sup_description = ? WHERE sup_document = ?";
      const parametros = [
        provider.name,
        provider.phoneNumber,
        provider.email,
        provider.website,
        provider.description,
        provider.document,
      ];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(provider) {
    if (provider instanceof Provider) {
      const sql = "DELETE FROM supplier WHERE sup_document = ?";
      const parametros = [provider.document];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametrosDaConsulta) {
    let sql = "";
    let parametros = [];
    if (parametrosDaConsulta && !isNaN(parametrosDaConsulta)) {
      sql = "SELECT * FROM supplier WHERE sup_id = ? order by sup_name";
      parametros = [parametrosDaConsulta];
    } else if (parametrosDaConsulta != "") {
      sql = "SELECT * FROM supplier WHERE sup_name like ?";
      parametros = [`%${parametrosDaConsulta}%`];
    } else {
      sql = "SELECT * FROM supplier order by sup_name";
      parametros = [""];
    }

    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaProviders = [];
    for (const registro of registros) {
      const provider = new Provider(
        registro.sup_id,
        registro.sup_document,
        registro.sup_name,
        registro.sup_phoneNumber,
        registro.sup_email,
        registro.sup_website,
        registro.sup_description
      );
      listaProviders.push(provider);
    }

    return listaProviders;
  }
}
