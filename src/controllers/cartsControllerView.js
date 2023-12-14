const CartsServiceView = require("../services/cartsService");

class CartsControllerView {
  constructor() {
    this.cartsService = new CartsServiceView();
  }

  // Edicion de carritos ----------------------------------------
  async carts(req,res) {
      const limit = parseInt(req.query.limit);
      const result = await this.cartsService.get(limit);
      res.json(result);
  }

  async cartsCid(req,res) {
    const userSession = req.user?.name;
    const cid = req.params.cid;
    const userEmail = req.user?.email;
    const result = await this.cartsService.getByIdLean(cid);
    const data = result.data
    const resultCart = await this.cartsService.getByEmail(userEmail);
    const productsInCart = resultCart.data.products == "" ? true : false; // Le indico al front si hay productos en el carrito
    const dataCartId = resultCart.data.id
    res.render("cartsCid.handlebars",{ title:"Page cart id", userSession, data, dataCartId, productsInCart });
  }

  async post(req,res) {
    const body = req.body;
    const result = await this.cartsService.post(body);
    res.json(result);
  }

  async put(req,res) {
    const cid = req.params.cid;
    const body = req.body;
    const result = await this.cartsService.put(cid,body);
    res.json(result);
  }

  async delete(req, res) {
    const cid = req.params.cid;
    const result = await this.cartsService.delete(cid);
    res.json(result);
  }

  // Edicion de productos en un carrito ----------------------------------------
  async getProductFromCart(req,res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await this.cartsService.getProductFromCart({ cid, pid });
    res.json(result);
  }

  async postProductFromCart(req,res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const body = req.body;
    const result = await this.cartsService.postProductFromCart({cid,pid,body});
    res.json(result);
  }

  async putProductFromCart(req,res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const body = req.body;
    const result = await this.cartsService.putProductFromCart({cid,pid,body});
    res.json(result);
  }

  async deleteProductFromCart(req,res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await this.cartsService.deleteProductFromCart({ cid, pid });
    res.json(result);
  }
}

module.exports = CartsControllerView;
