const {Router} = require("express")
const {userMiddleware,isAdmin, isUser} = require("../middlewares/middlewares")

const CartsControllerView = require("../controllers/cartsControllerView")

const cartRouterView = new Router()

const cartsControllerView = new CartsControllerView();

// Rutas consultas del carrito
cartRouterView.get("/carts", userMiddleware, isAdmin, cartsControllerView.carts.bind(cartsControllerView))
cartRouterView.get("/carts/:cid", userMiddleware, isUser, cartsControllerView.cartsCid.bind(cartsControllerView))
cartRouterView.post("/carts", isUser, cartsControllerView.post.bind(cartsControllerView))


module.exports = cartRouterView

