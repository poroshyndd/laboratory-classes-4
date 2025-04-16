const Product = require("../models/Product");
const { STATUS_CODE } = require("../constants/statusCode");

const getProductsView = (req, res) => {
  const products = Product.getAll();
  res.render("products", { products });
};

const getAddProductView = (req, res) => {
  res.render("add-product");
};

const addNewProduct = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .send("Wszystkie pola są wymagane.");
  }
  const product = new Product(name, description);
  Product.add(product);
  res.redirect("/products/new");
};

const getNewProductView = (req, res) => {
  const product = Product.getLast();
  res.render("new-product", { product });
};

const getProductView = (req, res) => {
  const { name } = req.params;
  const product = Product.findByName(name);
  if (product) {
    res.render("product", { product });
  } else {
    res
      .status(STATUS_CODE.NOT_FOUND)
      .send("Produkt o podanej nazwie nie został znaleziony.");
  }
};

const deleteProduct = (req, res) => {
  const { name } = req.params;
  const deleted = Product.deleteByName(name);
  if (deleted) {
    res.status(STATUS_CODE.OK).json({ success: true });
  } else {
    res
      .status(STATUS_CODE.NOT_FOUND)
      .json({ success: false, message: "Produkt nie został znaleziony." });
  }
};

module.exports = {
  getProductsView,
  getAddProductView,
  addNewProduct,
  getNewProductView,
  getProductView,
  deleteProduct,
};
