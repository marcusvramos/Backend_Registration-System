import ProductDAO from "../persistencia/productDAO.js";

export default class Product {
  #id;
  #name;
  #description;
  #unitPrice;
  #stockQuantity;
  #brand;
  #model;
  #manufacturingDate;
  #category;
  #provider;

  constructor(
    id = "",
    name = "",
    description = "",
    unitPrice = 0,
    stockQuantity = 0,
    brand = "",
    model = "",
    manufacturingDate = "",
    category = {},
    provider = {}
  ) {
    this.#id = id;
    this.#name = name;
    this.#description = description;
    this.#unitPrice = unitPrice;
    this.#stockQuantity = stockQuantity;
    this.#brand = brand;
    this.#model = model;
    this.#manufacturingDate = manufacturingDate;
    this.#category = category;
    this.#provider = provider;
  }

  get id() {
    return this.#id;
  }

  set id(newId) {
    this.#id = newId;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  get unitPrice() {
    return this.#unitPrice;
  }

  set unitPrice(newUnitPrice) {
    this.#unitPrice = newUnitPrice;
  }

  get stockQuantity() {
    return this.#stockQuantity;
  }

  set stockQuantity(newStockQuantity) {
    this.#stockQuantity = newStockQuantity;
  }

  get brand() {
    return this.#brand;
  }

  set brand(newBrand) {
    this.#brand = newBrand;
  }

  get model() {
    return this.#model;
  }

  set model(newModel) {
    this.#model = newModel;
  }

  get manufacturingDate() {
    return this.#manufacturingDate;
  }

  set manufacturingDate(newManufacturingDate) {
    this.#manufacturingDate = newManufacturingDate;
  }

  get category() {
    return this.#category;
  }

  set category(newCategory) {
    this.#category = newCategory;
  }

  get provider() {
    return this.#provider;
  }

  set provider(newProvider) {
    this.#provider = newProvider;
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      unitPrice: this.#unitPrice,
      stockQuantity: this.#stockQuantity,
      brand: this.#brand,
      model: this.#model,
      manufacturingDate: this.#manufacturingDate,
      category: this.#category.toJSON(),
      provider: this.#provider.toJSON(),
    };
  }

  async gravar() {
    const prodDAO = new ProductDAO();
    await prodDAO.gravar(this);
  }

  async excluir() {
    const prodDAO = new ProductDAO();
    await prodDAO.excluir(this);
  }

  async atualizar() {
    const prodDAO = new ProductDAO();
    await prodDAO.atualizar(this);
  }

  async consultar(parametro) {
    const prodDAO = new ProductDAO();
    return await prodDAO.consultar(parametro);
  }
}
