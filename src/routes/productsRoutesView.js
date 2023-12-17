const {Router} = require("express")
const {userMiddleware,isAdmin, isUser} = require("../middlewares/middlewares")

const ProductsControllerViews = require("../controllers/productsControllerViews")

const productRouterViews = new Router()

const productsControllerViews = new ProductsControllerViews();

productRouterViews.get("/realTimeProducts", userMiddleware, productsControllerViews.realTimeProducts.bind(productsControllerViews))
productRouterViews.get("/realTimeProducts/:pid", userMiddleware, isUser, productsControllerViews.realTimeProductsPid.bind(productsControllerViews))
productRouterViews.get("/realTimeProductsAdmin/:pid", userMiddleware, isAdmin, productsControllerViews.realTimeProductsAdminPid.bind(productsControllerViews))
productRouterViews.get("/realTimeProductsAdminAdd", userMiddleware, isAdmin, productsControllerViews.realTimeProductsAdminAdd.bind(productsControllerViews))

module.exports = productRouterViews

