const ProductsService = require("../services/productsService");
const CartsService = require("../services/cartsService");

class ProductsControllerViews {
  constructor() {
    this.productsService = new ProductsService();
    this.cartsService = new CartsService();
  }

  async get(req, res) {
    const data = await this.productsService.get();
    res.render("realTimeProducts.handlebars", { data });
  }

  async realTimeProducts(req, res) {
    const userSession = req.user?.name;
    const query = req.query;
    const userEmail = req.user?.email;
    const result = await this.productsService.getPaginate(query);
    const data = result.data;
    const resultCart = await this.cartsService.getByEmail(userEmail);
    const dataCartId = resultCart.data.id
    const rol = req.user?.rol
    const isAdmin = req.user?.rol == "admin" ? true : false;
    if (req.user?.rol == "admin" || req.user?.rol == "premium") {
      res.render("realTimeProductsAdmin.handlebars", { data, userSession, dataCartId, title: "Products Admin", isAdmin, rol});
    } else {
      res.render("realTimeProducts.handlebars", { data, userSession, dataCartId, title: "Products"});
    }
  }

  async realTimeProductsAdminPid(req, res) {
    const userSession = req.user?.name;
    const pid = req.params.pid;
    const result = await this.productsService.getById(pid);
    const data = result.data;
    const rol = req.user?.rol
    const isAdmin = req.user?.rol == "admin" ? true : false;
    res.render("realTimeProductsAdminPid.handlebars", { data, userSession, title: "Edit product", isAdmin, rol });
  }

  async realTimeProductsAdminAdd(req, res) {
    const userSession = req.user?.name;
    const rol = req.user?.rol
    const isAdmin = req.user?.rol == "admin" ? true : false;
    res.render("realTimeProductsAdminAdd.handlebars", { userSession, title: "Add product", isAdmin, rol });
  }

  async realTimeProductsPid(req, res) {
    const userSession = req.user?.name;
    const userSessionId = req.user?.id;
    const userEmail = req.user?.email;
    const query = req.query;
    const pid = req.params.pid;
    const result = await this.productsService.getById(pid);
    const data = result.data;
    const resultCart = await this.cartsService.getByEmail(userEmail);
    const dataCartId = resultCart.data.id
    res.render("realTimeProductsPid.handlebars", { data, dataCartId, userSession, userSessionId, title: "Page product id" });
  }
}

module.exports = ProductsControllerViews;
