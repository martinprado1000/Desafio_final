const UsersModel = require("../models/usersModel")

class UsersDAOMongo {
    constructor() {
        this.usersModel = UsersModel;
      }
    
      async get() {
        try {
          return await this.usersModel.find();
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta get");
        }
      }
    
      async getById(id) {
        try {
          return await this.usersModel.findById(id);
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta getById");
        }
      }
    
      async post(body) {
        try {
          return await this.usersModel.create(body);
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta post");
        }
      }
    
      async put(id, body) {
        try {
          return await this.usersModel.update( id );
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta");
        }
      }
    
      async delete(id) {
        try {
          const result = await this.usersModel.delete({ id });
          return result
        } catch (e) {
          throw new Error("Error inesperado al realizar la consulta");
        }
      }
    }

module.exports = UsersDAOMongo;