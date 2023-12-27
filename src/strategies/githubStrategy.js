const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const UsersService = require("../services/usersService");

this.usersService = new UsersService();

const githubStrategy = passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: "Iv1.60312c44dbb83c65",
      clientSecret: "103d6a1e8d8691c19f60cd265dbd13625bf19e86",
      callbackURL: "http://localhost:8080/api/loginGithub-callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //accessToken: se usa para leer datos de la aplicacion de git, refreshToken: es para actualizar el token despues del tiempo de vida, profile: viene la informacion de github.

      //console.log(profile) // Aca viene la info que nos trae github
      const result = await this.usersService.userCreateRegisterGitHub(profile);
      if (result.message) {
        done(null, false, result.message);
      } else {
        done(null, result);
      }
    }
  )
);

module.exports = githubStrategy;
