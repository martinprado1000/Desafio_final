const {Router} = require("express")

const ProductsController = require("../controllers/productsController")

const productRouter = new Router()

const productsController = new ProductsController();

productRouter.get("/products",productsController.get.bind(productsController))
productRouter.get("/productsPaginate",productsController.getPaginate.bind(productsController))
productRouter.get("/products/:pid",productsController.getById.bind(productsController))
productRouter.post("/products",productsController.post.bind(productsController))
productRouter.put("/products/:pid",productsController.put.bind(productsController))
productRouter.delete("/products/:pid",productsController.delete.bind(productsController))

module.exports = productRouter

