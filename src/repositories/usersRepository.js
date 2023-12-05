// Repository: requerimos el factory para seleccionar el tipo de persistencia

const usersFactory = require("../factories/usersFactory");
const UsersDTO = require("../DTOs/usersDTO");

class UsersRepository {
  constructor() {
    this.dao = usersFactory(process.env.PERSISTENCE);
  }

  async get() {
    const result = await this.dao.get();
    if (result == null) {
      return result;
    }
    return result.map((user) => new UsersDTO(user));
  }

  async getPaginate(query,options) {
    const result = await this.dao.getPaginate(query,options);
    if (result == null) {
      return result;
    }
    const payload = await result.docs.map((u)=>u.toObject());
    result.docs = payload
    result.docs = result.docs.map((users) => new UsersDTO(users));
    return result
  }

  async getById(id) {
    let result = await this.dao.getById(id);
    if (result == null) {
      return result;  
    }
    return new UsersDTO(result);
  }

  // async getByCode(code) {
  //   const result = await this.dao.getByCode(code);
  //   if (result == null) {
  //     return result;
  //   }
  //   return new UsersDTO(result);
  // }

  async getByEmail(email) {
    const result = await this.dao.getByEmail(email);
    // if (result == null) {
    //   return result;
    // }
    return result;
    //return new UsersDTO(result);
  }

  async post(body) {
    const result = await this.dao.post(body);
    if (result == null) {
      return result;
    }
    return new UsersDTO(result);
  }

  async put(id, body) {
    const result = await this.dao.put(id, body);
    if (result == null) {
      return result;
    }
    return new UsersDTO(result);
  }

  async delete(id) {
    const result = await this.dao.delete(id);
    return result;
  }

  async save(ob) {
    const result = await this.dao.save(ob);
    return result;
  }
}

module.exports = UsersRepository;
