import CategoryDAO from "../persistencia/categoryDAO.js";

export default class Category {
  #id;
  #name;
  #description;

  constructor(id = 0, name = "", description = "") {
    this.#id = id;
    this.#name = name;
    this.#description = description;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    newName = this.#name;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  get id(){
    return this.#description;
  }

  set id(newId){
    this.#id = newId;
  }
  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      description: this.#description,
    };
  }

  async gravar() {
    const catDAO = new CategoryDAO();
    await catDAO.gravar(this);
  }

  async excluir() {
    const catDAO = new CategoryDAO();
    await catDAO.excluir(this);
  }

  async atualizar() {
    const catDAO = new CategoryDAO();
    await catDAO.atualizar(this);
  }

  async consultar(parametro) {
    const catDAO = new CategoryDAO();
    return await catDAO.consultar(parametro);
  }
}
