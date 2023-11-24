import Purchase from "../model/purchase.js";
import conectar from "./conexao.js";
import Provider from "../model/provider.js";


export default class PurchaseDAO {

    async gravar(purchase) {
        if (purchase instanceof Purchase) {
            const sql = `INSERT INTO purchase(
                pur_providerId,
                pur_quantity,
                pur_value,
                pur_paymentMethod,
                pur_code
            ) VALUES(?,?,?,?,?)`
            const parametros = [
                purchase.provider.id,
                purchase.quantity,
                purchase.value,
                purchase.paymentMethod,
                purchase.purchaseCode
            ]
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            purchase.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(purchase) {
        if (purchase instanceof Purchase) {
            const sql = `UPDATE purchase SET pur_providerId = ?, pur_quantity = ?, pur_value = ?, pur_paymentMethod = ?, pur_purchaseCode = ? WHERE pur_id = ?`
            const parametros = [
                purchase.provider.document,
                purchase.quantity,
                purchase.value,
                purchase.paymentMethod,
                purchase.purchaseCode,
                purchase.id
            ]
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(purchase) {
        if (purchase instanceof Purchase) {
            const sql = `DELETE FROM purchase WHERE pur_id = ?`
            const parametros = [purchase.id]
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        termo = termo ?? ""

        const conexao = await conectar();
        const listaPurchases = [];

        let sql;
        let parametros;

        if (termo == "") {
            sql = `
                SELECT
                    p.pur_id,
                    p.pur_providerId,
                    p.pur_quantity,
                    p.pur_value,
                    p.pur_paymentMethod,
                    p.pur_code,
                    s.sup_id,
                    s.sup_name,
                    s.sup_document,
                    s.sup_phoneNumber,
                    s.sup_email,
                    s.sup_website,
                    s.sup_description

                FROM purchase p
                INNER JOIN supplier s ON 
                    p.pur_providerId = s.sup_id
                ORDER BY p.pur_id
            `
        }

        else {
            sql = `
            SELECT
                p.pur_id,
                p.pur_providerId,
                p.pur_quantity,
                p.pur_value,
                p.pur_paymentMethod,
                p.pur_code,
                s.sup_id,
                s.sup_name,
                s.sup_document,
                s.sup_phoneNumber,
                s.sup_email,
                s.sup_website,
                s.sup_description

            FROM 
                purchase p
            INNER JOIN supplier s ON 
                p.pur_providerId = s.sup_id
            ORDER BY 
                p.pur_id
        `            
        }

        const [registros, campos] = await conexao.execute(sql, parametros);

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

            const purchase = new Purchase(
                registro.pur_id,
                provider,
                registro.pur_quantity,
                registro.pur_value,
                registro.pur_paymentMethod,
                registro.pur_purchaseCode
            )

            listaPurchases.push(purchase.toJSON())
        }

        return listaPurchases;
    }



}