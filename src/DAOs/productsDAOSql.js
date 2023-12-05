const ProductsModel = require("../models/productsModel")

class ProductsDAOSql {
    constructor() {
        this.productsModel = productsModel;
      }
    
      async get() {
        try {
          return await this.productsModel.find();
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta get");
        }
      }
    
      async getById(id) {
        try {
          return await this.productsModel.findById(id);
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta getById");
        }
      }
    
      async post(body) {
        try {
          return await this.productsModel.create(body);
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta post");
        }
      }
    
      async put(id, body) {
        try {
          return await this.productsModel.update( id );
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta");
        }
      }
    
      async delete(id) {
        try {
          const result = await this.productsModel.delete({ id });
          return result
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta");
        }
      }
    }

module.exports = ProductsDAOSql;