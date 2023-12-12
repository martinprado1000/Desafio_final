const {Router} = require("express")

const CartsControllerView = require("../controllers/cartsControllerView")

const cartRouterView = new Router()

const cartsControllerView = new CartsControllerView();

// Rutas consultas del carrito
cartRouterView.get("/carts",cartsControllerView.carts.bind(cartsControllerView))
cartRouterView.get("/carts/:cid",cartsControllerView.cartsCid.bind(cartsControllerView))
cartRouterView.post("/carts",cartsControllerView.post.bind(cartsControllerView))


module.exports = cartRouterView

