const cartsModel = require("../models/cartsModel");

class CartsDAOMongo {
  constructor() {
    this.cartsModel = cartsModel;
  }

  async get(limit) {
    try {
      return await this.cartsModel.find().limit(limit).populate("products.product");
    } catch (e) {
      console.log(e)
      throw new Error("Error inesperado al realizar la consulta get");
    }
  }

  async getById(id) {
    try {
      return await this.cartsModel.findById(id);
    } catch (e) {
      console.log(e)
      throw new Error("Error inesperado al realizar la consulta getById");
    }
  }

  async getByEmail(email) {
    try {
      return await this.cartsModel.findOne({email:email});
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

  async save(ob) {
    try {
      return await ob.save();
    } catch (e) {
      console.log(e)
      throw new Error("Error inesperado al salvar la consulta");
    }
  }
}

module.exports = CartsDAOMongo;
