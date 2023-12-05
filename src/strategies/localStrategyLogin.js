const passport = require("passport");
const passportLocal = require("passport-local");
const UsersService = require("../services/usersService")

const LocalStrategy = passportLocal.Strategy;

this.usersService = new UsersService

const localStrategyLogin = 
passport.use("login", new LocalStrategy( 
    { usernameField: "email" }, 
    async (username, password, done) => {
      const result = await this.usersService.userLogin(username, password);
      if(result.message){
        done(null,false,result.message)
      } else {
        done(null,result)
      }
    }
  )
);

module.exports = localStrategyLogin;