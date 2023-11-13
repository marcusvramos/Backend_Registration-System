import ClientDAO from "../persistencia/clientDAO.js";

export default class Client {
  #id;
  #document;
  #name;
  #neighborhood;
  #address;
  #city;
  #uf;
  #number;
  #zipCode;

  constructor(
    id = 0,
    document = "",
    name = "",
    neighborhood = "",
    address = "",
    city = "",
    uf = "",
    number = "",
    zipCode = ""
  ) {
    this.#id = id;
    this.#document = document;
    this.#name = name;
    this.#neighborhood = neighborhood;
    this.#address = address;
    this.#city = city;
    this.#uf = uf;
    this.#number = number;
    this.#zipCode = zipCode;
  }

  toJSON() {
    return {
      id: this.#id,
      document: this.#document,
      name: this.#name,
      neighborhood: this.#neighborhood,
      address: this.#address,
      city: this.#city,
      uf: this.#uf,
      number: this.#number,
      zipCode: this.#zipCode,
    };
  }

  get id(){
    return this.#id;
  }

  get document() {
    return this.#document;
  }

  get name() {
    return this.#name;
  }

  get neighborhood() {
    return this.#neighborhood;
  }

  get address() {
    return this.#address;
  }

  get city() {
    return this.#city;
  }

  get uf() {
    return this.#uf;
  }

  get number() {
    return this.#number;
  }

  get zipCode() {
    return this.#zipCode;
  }

  set id(value){
    this.#id = value;
  }

  set document(value) {
    this.#document = value;
  }

  set name(value) {
    this.#name = value;
  }

  set neighborhood(value) {
    this.#neighborhood = value;
  }

  set address(value) {
    this.#address = value;
  }

  set city(value) {
    this.#city = value;
  }

  set uf(value) {
    this.#uf = value;
  }

  set number(value) {
    this.#number = value;
  }

  set zipCode(value) {
    this.#zipCode = value;
  }

  async gravar() {
    const cliDAO = new ClientDAO();
    await cliDAO.gravar(this);
  }

  async excluir() {
    const cliDAO = new ClientDAO();
    await cliDAO.excluir(this);
  }

  async atualizar() {
    const cliDAO = new ClientDAO();
    await cliDAO.atualizar(this);
  }

  async consultar(parametro) {
    const cliDAO = new ClientDAO();
    return await cliDAO.consultar(parametro);
  }
}
