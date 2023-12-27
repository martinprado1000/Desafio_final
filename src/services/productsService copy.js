const ProductsRepository = require("../repositories/productsRepository");
const UsersRepository = require("../repositories/usersRepository");
const CartsRepository = require("../repositories/cartsRepository");
const CartsService = require("../services/cartsService");
const {sendMailDeleteProductFn} = require("../utils/sendMailFn")
const mongoose = require("mongoose");

// Funcion para validar si los id son validos para mongo
const isValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

class ProductsService {
  constructor() {
    this.ProductsRepository = new ProductsRepository();
    this.UsersRepository = new UsersRepository();
    this.CartsRepository = new CartsRepository();
    this.CartsService = new CartsService();
  }

  async get() {
    try {
      const result = await this.ProductsRepository.get();
      if (!result || result == "") {
        return { status: 404, data: "Productos no encontrados" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getPaginate(data) {
    try {
      // ?limit=2&page=2&query=fruta&sort=asc  // esto podemos recibir en la consulta
      const limit = parseInt(data.limit) || 10;
      const page = parseInt(data.page) || 1;
      const category = data.category || "";
      let sort = data.sort == "asc" ? -1 : 1 || "";
      sort = { price: sort };
      //const sort = parseInt(data.sort) || " ";
      const options = { limit, page, category, sort };
      //const products = await productModel.paginate(query,{ limit , page , sort:{price:sort} })
      let query = {}; // Define un objeto vacío para la consulta
      if (category) {
        query.category = category; // Agrega la categoría a la consulta si se proporciona
      }
      const products = await this.ProductsRepository.getPaginate(query, options);
      if (!products || products == "") {
        return { status: 404, data: "Productos no encontrados" };
      }
      const payload = products.docs
      // paguinate me retorna un objeto que contiene toda la info de paguinacion y un array llamado docs que ahi se encuentran los datos solicitados.
      const productsPaginate = {
        status: "success",
        payload,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage == true ? `http://localhost:8080/realTimeProducts/?page=${products.prevPage}` : null,
        nextLink: products.hasNextPage == true ? `http://localhost:8080/realTimeProducts/?page=${products.nextPage}` : null,
      };
      return { status: 200, data: productsPaginate };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getById(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de producto invalido" };
    }
    try {
      if (!id) {
        return { status: 404, data: "Debe enviar un ID valido" };
      }
      const result = await this.ProductsRepository.getById(id);
      if (!result) {
        return { status: 404, data: "Producto no encontrado" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getByCode(code) {
    try {
      const result = await this.ProductsRepository.getByCode(code);
      if (!result) {
        return { status: 404, data: "Producto no encontrado" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async post(body) {
    const { title, description, price, code, stock, category } =
      body;
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        return { status: 404, data: "Campos incompletos" };
      }
      const productFound = await this.ProductsRepository.getByCode(code);
      if (productFound != null) {
        return { status: 404, data: "El codigo de producto ya existe" };
      }
      await this.ProductsRepository.post(body);
      return { status: 201, data: "Producto ingresado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async put(id, body) {
    // Valido si es un id valido de mongoo
    if (!isValid(id)) {
      return { status: 404, data: "ID de producto invalido" };
    }
    try {
      // Valido si existe el id
      if (!id) {
        return { status: 400, data: "Debe enviar un ID valido" };
      }
      const productFound = await this.ProductsRepository.getById(id); //-------
      // Valido si existe el producto
      if (!productFound) {
        return { status: 404, data: "Producto no encontrado" };
      }
      // Valido que el codigo de producto no se modifique
      if (productFound.code != body.code) {
        // No permito editar el codigo de producto
        return {
          status: 404,
          data: "El código de producto no se puede editar",
        };
      }
      await this.ProductsRepository.put(id, body);
      return { status: 201, data: "Producto editado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async delete(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de producto invalido" };
    }
    try {
      if (!id) {
        return { status: 400, data: "Debe enviar un ID valido" };
      }

      const product = await this.getById(id) //Obtengo el producto antes de eliminar

      const result = await this.ProductsRepository.delete(id);
      if (result.deletedCount == 0) {
        return { status: 404, data: "Producto no encontrado" };
      }

      // Obtengo el dueño del producto para enviar correo que se elimino su producto en caso de ser premium.
      const user = await this.UsersRepository.getByEmail(product.data.owner)
      if(user.rol == "premium"){ // Si el dueño del producto es premium le envio un correo
        const result = sendMailDeleteProductFn(user.email , product.data.code)
        //console.log(result)
      }

      return { status: 201, data: "Producto eliminado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async delete2(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de producto invalido" };
    }
    try {
      if (!id) {
        return { status: 400, data: "Debe enviar un ID valido" };
      }

      let carts = await this.CartsRepository.getLean()

      console.log("-------------------------")
      console.log(`este es el id del producto a eliminar ${id}---------`)
      console.log(carts)
      console.log("-------------------------")
      console.log("-------------------------")
      const modifiedCartsArray = carts.map( (cart) => {
        console.log(cart)
        cart.products = cart.products.filter(prod => prod.product._id !== id);
        //cart.products = cart.products.map   (prod =>console.log(`${prod.product._id}---------`));
        return cart;
      });
      console.log(`---//-------------------------------`)
      //carts = modifiedCartsArray
      console.log(modifiedCartsArray)
      //console.log(modifiedCartsArray.products)
      modifiedCartsArray.map(prod =>console.log(`${prod._id}---------`));
      
      const tt = await this.CartsRepository.save(carts);
      //console.log(tt)
      //console.log(carts)
      //const deleteProductCart = carts.map( async(cart)=>{

        //const cartsWithProduct = await cart.products.map(async(products)=>{

          // if (products.product?._id == id) {
          //   console.log("siiiiiiiiiiii esta")
          //   //console.log(products.product._id)
          //   //console.log(cart._id)
          //   console.log(products)
          //   const pid = products.product._id
          //   console.log(`este es el id del producto a eliminar ${id}`)
          //   console.log(`este es el id del producto a eliminar ${pid}`)
          //   const cid = cart.id
          //   console.log(`este es el id del producto a eliminar ${cid}`)
          //   const qq = await this.CartsService.deleteProductFromCart({ cid , pid })
          //   console.log(qq)
          // } else {
          //   console.log("no igual")
          // }
        //})
      //})

      //const product = await this.getById(id) //Obtengo el producto antes de eliminar
      //const result = await this.ProductsRepository.delete(id);
      // if (result.deletedCount == 0) {
      //   return { status: 404, data: "Producto no encontrado" };
      // }

      // Obtengo el dueño del producto para enviar correo que se elimino su producto en caso de ser premium.
      //const userOwner = await this.UsersRepository.getByEmail(product.data.owner)
      
      // if(userOwner.rol == "premium"){ // Si el dueño del producto es premium le envio un correo
      //   sendMailDeleteProductFn(userOwner.email , product.data.code)
      // }


      return { status: 201, data: "Producto eliminado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }
}

module.exports = ProductsService;
