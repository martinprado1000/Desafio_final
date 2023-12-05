const {Router} = require("express")

const CartsRouterView = require("../controllers/cartsControllerView")

const cartRouterView = new Router()

const cartsControllerView = new CartsRouter();

// Rutas consultas del carrito
cartRouter.get("/carts",cartsControllerView.get.bind(cartsControllerView))
cartRouter.get("/carts/:cid",cartsControllerView.getById.bind(cartsControllerView))
cartRouter.post("/carts",cartsControllerView.post.bind(cartsControllerView))


module.exports = cartRouterView

