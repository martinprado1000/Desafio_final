const ProductsService = require("../services/productsService");

class ProductsControllerViews {
  constructor() {
    this.productsService = new ProductsService();
  }

  async get(req, res) {
    const data = await this.productsService.get();
    //res.render("realTimeProductsDb.handlebars", {data , userSession});
    res.render("realTimeProducts.handlebars", { data });
  }

  async realTimeProducts(req, res) {
    const userSession = req.user?.name;
    const query = req.query;
    const result = await this.productsService.getPaginate(query);
    const data = result.data;
    if (req.user?.rol == "admin") {
      res.render("realTimeProductsAdmin.handlebars", { data, userSession, title: "Products Admin"});
    } else {
      res.render("realTimeProducts.handlebars", { data, userSession, title: "Products"});
    }
  }
  // async realTimeProductsAdmin(req,res){
  //     const userSession = req.user?.name;
  //     const query = req.query
  //     const result = await this.productsService.getPaginateAdmin(query)
  //     const data = result.data
  //     //console.log(data)
  //     res.render("realTimeProductsAdmin.handlebars",{userSession, data, title:"Page products"});
  // }

  async realTimeProductsAdminPid(req, res) {
    const userSession = req.user?.name;
    const pid = req.params.pid;
    const result = await this.productsService.getById(pid);
    const data = result.data;
    res.render("realTimeProductsAdminPid.handlebars", { data, userSession, title: "Edit product"});
  }

  async realTimeProductsAdminAdd(req, res) {
    const userSession = req.user?.name;
    console.log(userSession);
    res.render("realTimeProductsAdminAdd.handlebars", { userSession, title: "Add product" });
    // if (req.user?.rol == "admin") {
    //     res.render("realTimeProductsAdminAdd.handlebars",{userSession, title:"Add product"});
    //   } else {
    //     res.render("realTimeProductsAdminAdd.handlebars",{userSession, title:"Add product"});
    //   }
  }

  async realTimeProductsPid(req, res) {
    const userSession = req.user?.name;
    const userSessionId = req.user?.id;
    console.log(userSessionId)
    const query = req.query;
    const pid = req.params.pid;
    const result = await this.productsService.getById(pid);
    const data = result.data;
    console.log(data);
    res.render("realTimeProductsPid.handlebars", { data, userSession, userSessionId, title: "Page product id" });
  }

  // async getById(req,res){
  //     const id = req.params.pid
  //     const result = await this.productsService.getById(id)
  //     res.json(result)
  // }

  // async post(req,res){
  //     const body = req.body
  //     const result = await this.productsService.post(body)
  //     res.json(result)
  // }

  // async put(req,res){
  //     const id = req.params.pid
  //     const body = req.body
  //     const result = await this.productsService.put(id,body)
  //     res.json(result)
  // }

  // async delete(req,res){
  //     const id = req.params.pid
  //     const result = await this.productsService.delete(id)
  //     res.json(result)
  // }
}

module.exports = ProductsControllerViews;
