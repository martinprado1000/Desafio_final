const passport = require("passport");
const passportLocal = require("passport-local");
const UsersService = require("../services/usersService")

const LocalStrategy = passportLocal.Strategy;

this.usersService = new UsersService
 
const localStrategyRegister = 
passport.use( // El primer parametro es un string, seria el nombre del passport. Y el segundo es una instacia
"register", // Nombre del passport
new LocalStrategy( // Instanciamos el passport, el primer parametro es un objeto y el segundo es una funcion
  { passReqToCallback: true, usernameField: "email" }, // Si no le indicamos el email toma por default el nombre si tiene.
  async (req, username, password, done) => {
    const result = await this.usersService.userCreateRegister(req, username, password);
    if(result.message){
      done(null,false,result.message)
    } else {
      done(null,result)
    }
  }
)
);

module.exports = localStrategyRegister;