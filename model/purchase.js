import PurchaseDAO from "../persistencia/purchaseDAO.js"
export default class Purchase {
    #id
    #provider
    #quantity
    #value
    #paymentMethod
    #purchaseCode

    constructor(
        id = "",
        provider = {},
        quantity = 0,
        value = 0,
        paymentMethod = "",
        purchaseCode = ""
    ) {
        this.#id = id
        this.#provider = provider
        this.#quantity = quantity
        this.#value = value
        this.#paymentMethod = paymentMethod
        this.#purchaseCode = purchaseCode
    }

    get id() {
        return this.#id
    }

    set id(newId) {
        this.#id = newId
    }

    get provider() {
        return this.#provider
    }

    set provider(newProvider) {
        this.#provider = newProvider
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

    get purchaseCode() {
        return this.#purchaseCode
    }

    set purchaseCode(newPurchaseCode) {
        this.#purchaseCode = newPurchaseCode
    }

    toString() {
        return `Purchase: ${this.#id} - ${this.#provider} - ${this.#quantity} - ${this.#value} - ${this.#paymentMethod} - ${this.#purchaseCode}`
    }

    toJSON() {
        return {
            id: this.#id,
            provider: this.provider.toJSON(),
            quantity: this.#quantity,
            value: this.#value,
            paymentMethod: this.#paymentMethod,
            purchaseCode: this.#purchaseCode
        }
    }

    async gravar(){
        const purDAO = new PurchaseDAO();
        await purDAO.gravar(this);
    }

    async atualizar(){
        const purDAO = new PurchaseDAO();
        await purDAO.atualizar(this);
    }

    async excluir(){
        const purDAO = new PurchaseDAO();
        await purDAO.excluir(this);
    }

    async consultar(termo){
        const purDAO = new PurchaseDAO();
        const listaPurchases = await purDAO.consultar(termo);
        return listaPurchases;
    }
}