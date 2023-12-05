const cartsModel = require("../models/cartsModel");

class CartsDAOSql {
  constructor() {
    this.cartsModel = cartsModel;
  }

  async get() {
    try {
      return await this.cartsModel.find();
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta get");
    }
  }

  async getById(id) {
    try {
      return await this.cartsModel.findById(id);
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta getById");
    }
  }

  async post(body) {
    try {
      return await this.cartsModel.create(body);
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta post");
    }
  }

  async put(id, body) {
    try {
      return await this.cartsModel.findByIdAndUpdate( id, { $set: body });
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta");
    }
  }

  async delete(id) {
    try {
      const result = await this.cartsModel.deleteOne({ _id:id });
      return result
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta");
    }
  }
}

module.exports = CartsDAOSql;
