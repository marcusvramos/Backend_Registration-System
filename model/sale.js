import SaleDAO from "../persistencia/saleDAO.js"

export default class Sale {
    #id
    #client
    #quantity
    #value
    #paymentMethod
    #code

    constructor(
        id = "",
        client = {},
        quantity = 0,
        value = 0,
        paymentMethod = "",
        code = ""
    ) {
        this.#id = id
        this.#client = client
        this.#quantity = quantity
        this.#value = value
        this.#paymentMethod = paymentMethod
        this.#code = code
    }

    get id() {
        return this.#id
    }

    set id(newId) {
        this.#id = newId
    }

    get client() {
        return this.#client
    }

    set client(newclient) {
        this.#client = newclient
    }

    get quantity() {
        return this.#quantity
    }

    set quantity(newQuantity) {
        this.#quantity = newQuantity
    }

    get value() {
        return this.#value
    }

    set value(newValue) {
        this.#value = newValue
    }   

    get paymentMethod() {
        return this.#paymentMethod
    }   

    set paymentMethod(newPaymentMethod) {
        this.#paymentMethod = newPaymentMethod
    }

    get code() {
        return this.#code
    }

    set code(newcode) {
        this.#code = newcode
    }

    toString() {
        return `Purchase: ${this.#id} - ${this.#client} - ${this.#quantity} - ${this.#value} - ${this.#paymentMethod} - ${this.#code}`
    }

    toJSON() {
        return {
            id: this.#id,
            client: this.client.toJSON(),
            quantity: this.#quantity,
            value: this.#value,
            paymentMethod: this.#paymentMethod,
            code: this.#code
        }
    }

    async gravar(){
        const salDAO = new SaleDAO();
        await salDAO.gravar(this);
    }

    async atualizar(){
        const salDAO = new SaleDAO();
        await salDAO.atualizar(this);
    }

    async excluir(){
        const salDAO = new SaleDAO();
        await salDAO.excluir(this);
    }

    async consultar(termo){
        const salDAO = new SaleDAO();
        const listaPurchases = await salDAO.consultar(termo);
        return listaPurchases;
    }
}