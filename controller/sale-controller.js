import Sale from '../model/sale.js';
import Client from '../model/client.js';


export default class SaleController {

    post(req, res) {
        res.type('application/json');
        if (req.method == "POST") {
            try {
                const { clientId, quantity, value, paymentMethod, code } = req.body;
                if (clientId && quantity && value && paymentMethod && code) {
                    let client;
                    const clientPromise = new Client(clientId).consultar(clientId);
                    clientPromise.then((resposta) => {
                        client = resposta[0];
                        if (!client) {
                            return res.status(400).send({
                                status: false,
                                message: "Cliente informado é inválido!"
                            })
                        }
                        const sale = new Sale(0, client, quantity, value, paymentMethod, code);
                        sale.gravar().then((resposta) => {
                            return res.status(201).send({
                                status: true,
                                message: "Venda cadastrada com sucesso!",
                                sale: sale
                            })
                        }).catch((erro) => {
                            return res.status(400).send({
                                status: false,
                                message: "Erro ao cadastrar a Venda!",
                                data: erro
                            })
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao consultar o cliente!",
                            data: erro
                        })
                    })
                } else {
                    return res.status(400).send({
                        status: false,
                        message: "Dados obrigatórios não foram preenchidos!"
                    })
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
        res.type('application/json');
        if (req.method === "PUT") {
            try {
                const id = req.params.id
                const { clientId, quantity, value, paymentMethod, code } = req.body;
                if (id && clientId && quantity && value && paymentMethod && code) {
                    let client;
                    const clientPromise = new Client(clientId).consultar(clientId);
                    clientPromise.then((resposta) => {
                        client = resposta[0];
                        if (!client) {
                            return res.status(400).send({
                                status: false,
                                message: "cliente informado é inválido!"
                            })
                        }
                        const sale = new Sale(id, client, quantity, value, paymentMethod, code);
                        const salePromise = sale.atualizar();
                        salePromise.then((resposta) => {
                            return res.status(201).send({
                                status: true,
                                message: "venda atualizada com sucesso!",
                                data: resposta
                            })
                        }).catch((erro) => {
                            return res.status(400).send({
                                status: false,
                                message: "Erro ao atualizar a venda!",
                                data: erro
                            })
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao consultar o cliente!",
                            data: erro
                        })
                    })
                } else {
                    return res.status(400).send({
                        status: false,
                        message: "Dados obrigatórios não foram preenchidos!"
                    })
                }
            } catch (e) {
                return res.status(400).send({
                    status: false,
                    message: e,
                });
            }
        }
    }

    delete(req, res) {
        res.type('application/json');
        if (req.method === "DELETE") {
            try {
                const { id } = req.params;
                if (id) {
                    const sale = new Sale(id);
                    const salePromise = sale.excluir();
                    salePromise.then((resposta) => {
                        return res.status(201).send({
                            status: true,
                            message: "venda excluída com sucesso!",
                            data: resposta
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao excluir a venda!",
                            data: erro
                        })
                    })
                } else {
                    return res.status(400).send({
                        status: false,
                        message: "Dados obrigatórios não foram preenchidos!"
                    })
                }
            } catch (e) {
                return res.status(400).send({
                    status: false,
                    message: e,
                });
            }
        }
    }

    get(req, res) {
        res.type('application/json');
        if (req.method === "GET") {
            try {
                const parametro = req.params.id ??  "";
                const sale = new Sale();
                sale.consultar(parametro).then((resposta) => {
                    return res.status(201).send({
                        status: true,
                        message: "Venda consultada com sucesso!",
                        lista: resposta
                    })
                }).catch((erro) => {
                    return res.status(400).send({
                        status: false,
                        message: "Erro ao consultar a venda!",
                        lista: erro
                    })
                })
            } catch (e) {
                return res.status(400).send({
                    status: false,
                    message: e,
                });
            }
        }
    }
}