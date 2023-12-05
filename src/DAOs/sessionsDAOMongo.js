const sessionsModel = require("../models/sessionsModel");

class SessionsDAOMongo {
  constructor() {
    this.sessionsModel = sessionsModel;
  }

  async get() {
    try {
      return await this.sessionsModel.find();
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta get");
    }
  }

  async postRegister(query,options) {
    try {
      return await this.sessionsModel.paginate(query,options);
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta get");
    }
  }

  async postLogin(id) {
    try {
      return await this.sessionsModel.findById(id);
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta getById");
    }
  }

  async deleteRegister(code) {
    try {
      return await this.sessionsModel.findOne({code:code});
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta getById");
    }
  }

  async resetPassword(body) {
    try {
      return await this.sessionsModel.create(body);
    } catch (e) {
      throw new Error("Error inesperado al realizar la consulta post");
    }
  }

}

module.exports = SessionsDAOMongo;
