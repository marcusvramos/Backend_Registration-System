import Product from "./model/product.js";
import Category from "./model/category.js";
import Provider from "./model/provider.js";

const category = new Category("Categoria 01", "Calçados Infantis");
const provider = new Provider(
  "40380352800",
  "Samsung",
  "18996807124",
  "provedor@gmail.com",
  "www.provedor.com",
  "descricao do provedor"
);
const produto = new Product(
  "Samsung Galaxy FE",
  "Celular bom da samsung",
  2000,
  15,
  "Samsung",
  "Galaxy",
  "2023/05/04",
  category,
  provider,
);

console.log(produto.toJSON());
