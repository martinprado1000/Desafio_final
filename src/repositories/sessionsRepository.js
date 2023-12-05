// Repository: requerimos el factory para seleccionar el tipo de persistencia

const sessionsFactory = require("../factories/sessionsFactory");
const SessionsDTO = require("../DTOs/sessionsDTO");

class SessionsRepository {
  constructor() {
    this.dao = sessionsFactory(process.env.PERSISTENCE);
    //console.log(this.dao);
  }

  async get() {

    
    return result.map((session) => new SessionsDTO(session));
  }

  async postRegister(query,options) {


    return result
  }


  async postLogin(id) {
 
    return result
  }


  async deleteRegister(id) {

    return result
  }


  async resetPassword(code) {

      return result;
  }

}

module.exports = SessionsRepository;
