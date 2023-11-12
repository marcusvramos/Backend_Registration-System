export class Document {
  #document;
  constructor(document = "") {
    this.#document = document.replace(/\D/g, "");
  }
  isValid() {
    return this.#document.length === 11 || this.#document.length === 14;
  }

  equals(document) {
    return this.toString() === document.toString();
  }
}
