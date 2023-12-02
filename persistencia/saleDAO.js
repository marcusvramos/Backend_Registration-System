import Client from "../model/client.js";
import Sale from "../model/sale.js";
import conectar from "./conexao.js";


export default class SaleDAO {

    async gravar(sale) {
        if (sale instanceof Sale) {
            const sql = `INSERT INTO sale(
              sal_value,
              sal_quantity,
              sal_paymentMethod,
              sal_code,
              sal_clientId
            ) VALUES(?,?,?,?,?)`
            const parametros = [
                sale.value,
                sale.quantity,
                sale.paymentMethod,
                sale.code,
                sale.client.id
            ]
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            sale.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(sale) {
        if (sale instanceof Sale) {
            const sql = `UPDATE sale SET sal_clientId = ?, sal_quantity = ?, sal_value = ?, sal_paymentMethod = ?, sal_code = ? WHERE sal_id = ?`
            const parametros = [
                sale.client.id,
                sale.quantity,
                sale.value,
                sale.paymentMethod,
                sale.code,
                sale.id
            ]
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(sale) {
        if (sale instanceof Sale) {
            const sql = `DELETE FROM sale WHERE sal_id = ?`
            const parametros = [sale.id]
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        termo = termo ?? ""

        const conexao = await conectar();
        const listaSales = [];

        let sql;
        let parametros;

        if (termo == "") {
            sql = `
            SELECT
                s.sal_id,
                s.sal_clientId,
                s.sal_quantity,
                s.sal_value,
                s.sal_paymentMethod,
                s.sal_code,
                c.cli_id,
                c.cli_name,
                c.cli_document,
                c.cli_address,
                c.cli_neighborhood,
                c.cli_city,
                c.cli_uf,
                c.cli_number,
                c.cli_zipCode
              FROM sale s
              INNER JOIN client c 
              ON s.sal_clientId = c.cli_id
              ORDER BY s.sal_id
            `
        }

        else {
          sql = `
          SELECT
              s.sal_id,
              s.sal_clientId,
              s.sal_quantity,
              s.sal_value,
              s.sal_paymentMethod,
              s.sal_code,
              c.cli_id,
              c.cli_name,
              c.cli_document,
              c.cli_address,
              c.cli_neighborhood,
              c.cli_city,
              c.cli_uf,
              c.cli_number,
              c.cli_zipCode
            FROM sale s
            INNER JOIN client c 
            ON s.sal_clientId = c.cli_id
            ORDER BY s.sal_id
          `      
        }

        const [registros, campos] = await conexao.execute(sql, parametros);

        for (const registro of registros) {
            const client = new Client(
                registro.cli_id,
                registro.cli_name,
                registro.cli_document,
                registro.cli_address,
                registro.cli_neightborhood,
                registro.cli_city,
                registro.cli_uf,
                registro.cli_number,
                registro.cli_zipCode
            );

            const sale = new Sale(
                registro.sal_id,
                client,
                registro.sal_quantity,
                registro.sal_value,
                registro.sal_paymentMethod,
                registro.sal_code
            )

            listaSales.push(sale.toJSON())
        }

        return listaSales;
    }



}