import Purchase from '../model/purchase.js';
import Provider from '../model/provider.js';


export default class PurchaseController {

    post(req, res) {
        res.type('application/json');
        if (req.method == "POST") {
            try {
                const { providerId, quantity, value, paymentMethod, purchaseCode } = req.body;
                if (providerId && quantity && value && paymentMethod && purchaseCode) {
                    let provider;
                    const providerPromise = new Provider(providerId).consultar(providerId);
                    providerPromise.then((resposta) => {
                        provider = resposta[0];
                        if (!provider) {
                            return res.status(400).send({
                                status: false,
                                message: "Fornecedor informado é inválido!"
                            })
                        }
                        const purchase = new Purchase(0, provider, quantity, value, paymentMethod, purchaseCode);
                        purchase.gravar().then((resposta) => {
                            return res.status(201).send({
                                status: true,
                                message: "Compra cadastrada com sucesso!",
                                data: resposta
                            })
                        }).catch((erro) => {
                            return res.status(400).send({
                                status: false,
                                message: "Erro ao cadastrar a compra!",
                                data: erro
                            })
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao consultar o fornecedor!",
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
                const { providerId, quantity, value, paymentMethod, purchaseCode } = req.body;
                if (id && providerId && quantity && value && paymentMethod && purchaseCode) {
                    let provider;
                    const providerPromise = new Provider(providerId).consultar(providerId);
                    providerPromise.then((resposta) => {
                        provider = resposta[0];
                        if (!provider) {
                            return res.status(400).send({
                                status: false,
                                message: "Fornecedor informado é inválido!"
                            })
                        }
                        const purchase = new Purchase(id, provider, quantity, value, paymentMethod, purchaseCode);
                        const purchasePromise = purchase.atualizar(purchase);
                        purchasePromise.then((resposta) => {
                            return res.status(201).send({
                                status: true,
                                message: "Compra atualizada com sucesso!",
                                data: resposta
                            })
                        }).catch((erro) => {
                            return res.status(400).send({
                                status: false,
                                message: "Erro ao atualizar a compra!",
                                data: erro
                            })
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao consultar o fornecedor!",
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
                    const purchase = new Purchase(id);
                    const purchasePromise = purchase.excluir(purchase);
                    purchasePromise.then((resposta) => {
                        return res.status(201).send({
                            status: true,
                            message: "Compra excluída com sucesso!",
                            data: resposta
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao excluir a compra!",
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
                const purchase = new Purchase();
                purchase.consultar(parametro).then((resposta) => {
                    return res.status(201).send({
                        status: true,
                        message: "Compra consultada com sucesso!",
                        data: resposta
                    })
                }).catch((erro) => {
                    return res.status(400).send({
                        status: false,
                        message: "Erro ao consultar a compra!",
                        data: erro
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