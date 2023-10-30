export default class Product {
  #document;
  #name;
  #phoneNumber;
  #email;
  #website;
  #description;

  constructor(
    document = "",
    name = "",
    phoneNumber = "",
    email = "",
    website = "",
    description = ""
  ) {
    this.#document = document;
    this.#name = name;
    this.#phoneNumber = phoneNumber;
    this.#email = email;
    this.#website = website;
    this.#description = description;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get document() {
    return this.#document;
  }

  set document(newDocument) {
    this.#document = newDocument;
  }

  get phoneNumber() {
    return this.#phoneNumber;
  }

  set phoneNumber(newPhoneNumber) {
    this.#phoneNumber = newPhoneNumber;
  }

  get email() {
    return this.#email;
  }

  set email(newEmail) {
    this.#email = newEmail;
  }

  get website() {
    return this.#website;
  }

  set website(newWebsite) {
    this.#website = newWebsite;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  toJSON() {
    return {
      document: this.#document,
      name: this.#name,
      phoneNumber: this.#phoneNumber,
      email: this.#email,
      website: this.#website,
      description: this.#description,
    };
  }

  async gravar() {}

  async excluir() {}

  async alterar() {}

  async consultar() {}
}
