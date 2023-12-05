const passport = require("passport");
const passportLocal = require("passport-local");
const usersModel = require("../models/usersModel");
const UsersService = require("../services/usersService")
const { hashPassword, isValidPassword } = require("../utils/passwordHash");

const LocalStrategy = passportLocal.Strategy;

this.usersService = new UsersService
 
const localStrategyRegister = 
passport.use( // El primer parametro es un string, seria el nombre del passport. Y el segundo es una instacia
"register", // Nombre del passport
new LocalStrategy( // Instanciamos el passport, el primer parametro es un objeto y el segundo es una funcion
  { passReqToCallback: true, usernameField: "email" }, // Si no le indicamos el email toma por default el nombre si tiene.
  async (req, username, password, done) => { //username es el email
    // El username siermpre hace referencia al email porque lo definimos en la linea de arriba.
    const {name, lastname, age, passwordRepit} = req.body
    // if(!username || !password ||!name || !lastname || !age || !passwordRepit){
    //   return done(null, false, {message:`Datos incompletos`});
    // }
    if(password != passwordRepit){
      return done(null, false, {message:`Las contraseñas no coinciden`});
    }
    try {
      //const exist = await usersModel.findOne({ email: username }); // Aca le decimos que el email tiene que ser igual a username porque en la linea anterior le indicamos que como nombre usamos el email
      let exist = await this.usersService.getByEmail(username);

      if (exist.status == 200) {
        console.log(`El usuario ${username} ya existe`);
        return done(null, false, {message:`El usuario ${username} ya existe`});
      }

      const body = req.body;
      body.password = hashPassword(body.password); // Llamamos a nustra funcion para hashear la password
      //let user = await usersModel.create(body);
      let user = await this.usersService.post(body);
      console.log(user)
      if (user.status != 201) {
        return done(null, false, { message: user.data });
      }

      console.log(`Usuario ${username} creado correctamente`);
      user = await this.usersService.getByEmail(username);
      return done(null, user.data);
      // console.log(user)
      // console.log(`Usuario ${username} creado correctamente`);
      // return done(null, user);

    } catch (e) {
      console.log("Error al leer la db");
      return done(e);
    }
  }
)
);

module.exports = localStrategyRegister;