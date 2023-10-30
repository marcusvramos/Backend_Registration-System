export default class Category {
  #name;
  #description;

  constructor(name = "", description = "") {
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

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
    };
  }

  async gravar() {}

  async excluir() {}

  async alterar() {}

  async consultar() {}
}
