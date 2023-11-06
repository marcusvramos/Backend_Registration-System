import Product from "./model/product.js";
import Category from "./model/category.js";
import Provider from "./model/provider.js";

const category = new Category(3, "Categoria 02", "Camisetas Infantis");

// category.gravar().then(() => {
//   console.log(category.toJSON());
// })

category.consultar(4).then((resp) => {
  console.log(JSON.stringify(resp[0]));
})

