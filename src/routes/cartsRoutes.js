const {Router} = require("express")

const CartsRouter = require("../controllers/cartsController")

const cartRouter = new Router()

const cartsController = new CartsRouter();

// Rutas consultas del carrito
cartRouter.get("/carts",cartsController.get.bind(cartsController))
cartRouter.get("/carts/:cid",cartsController.getById.bind(cartsController))
cartRouter.post("/carts",cartsController.post.bind(cartsController))
cartRouter.put("/carts/:cid",cartsController.put.bind(cartsController))
cartRouter.delete("/carts/:cid",cartsController.delete.bind(cartsController))

// Rutas consultas de productos en un carrito
cartRouter.get("/carts/:cid/product/:pid",cartsController.getProductFromCart.bind(cartsController))
cartRouter.post("/carts/:cid/product/:pid",cartsController.postProductFromCart.bind(cartsController))
cartRouter.put("/carts/:cid/product/:pid",cartsController.putProductFromCart.bind(cartsController))
cartRouter.delete("/carts/:cid/product/:pid",cartsController.deleteProductFromCart.bind(cartsController))

module.exports = cartRouter

