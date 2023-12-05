const {Router} = require("express")

const ProductsControllerViews = require("../controllers/productsControllerViews")

const productRouterViews = new Router()

const productsControllerViews = new ProductsControllerViews();

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

productRouterViews.get("/realTimeProducts", userMiddleware, productsControllerViews.realTimeProducts.bind(productsControllerViews))
productRouterViews.get("/realTimeProducts/:pid", userMiddleware, productsControllerViews.realTimeProductsPid.bind(productsControllerViews))

//productRouterViews.get("/realTimeProductsAdmin", userMiddleware, productsControllerViews.realTimeProductsAdmin.bind(productsControllerViews))
productRouterViews.get("/realTimeProductsAdmin/:pid", userMiddleware, isAdmin, productsControllerViews.realTimeProductsAdminPid.bind(productsControllerViews))
productRouterViews.get("/realTimeProductsAdminAdd", userMiddleware, isAdmin, productsControllerViews.realTimeProductsAdminAdd.bind(productsControllerViews))
//productRouterViews.get("/realTimeProducts/:pid",productsControllerViews.getById.bind(productsControllerViews))




//productRouterViews.post("/realTimeProducts",productsControllerViews.post.bind(productsControllerViews))
//productRouterViews.put("/realTimeProducts/:pid",productsControllerViews.put.bind(productsControllerViews))
//productRouterViews.delete("/realTimeProducts/:pid",productsControllerViews.delete.bind(productsControllerViews))

module.exports = productRouterViews

