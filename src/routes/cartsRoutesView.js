const {Router} = require("express")

const CartsControllerView = require("../controllers/cartsControllerView")

const cartRouterView = new Router()

const cartsControllerView = new CartsControllerView();

// Middleware chequeo si ya hay una sesion activa
const userMiddleware = (req, res, next) => {
    if (!req.user) {
    return res.redirect("/login");
  }
  return next();
}

// Middleware chequeo si es admin
const isAdmin = (req, res, next) => {
  if (req.user.rol != "admin") {
  return res.redirect("/login");
}
return next();
}

// Rutas consultas del carrito
cartRouterView.get("/carts", userMiddleware, cartsControllerView.carts.bind(cartsControllerView))
cartRouterView.get("/carts/:cid", userMiddleware, cartsControllerView.cartsCid.bind(cartsControllerView))
cartRouterView.post("/carts",cartsControllerView.post.bind(cartsControllerView))


module.exports = cartRouterView

