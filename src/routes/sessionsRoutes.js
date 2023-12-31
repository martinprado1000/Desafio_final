const { Router } = require("express");
const passport = require("passport")

const SessionsController = require("../controllers/sessionsController")
const UsersControllerView = require("../controllers/usersControllerView")

const sessionRouter = new Router() 

const sessionsController = new SessionsController();
const usersControllerView = new UsersControllerView();

sessionRouter.get("/", sessionsController.getRegister.bind(sessionsController));

sessionRouter.post("/register", passport.authenticate('register',{failureRedirect:'/register' , failureFlash: true}), sessionsController.postRegister.bind(sessionsController)); // Inyectamos passport como un middleware. // registerPost 

sessionRouter.post("/registerForAdmin", passport.authenticate('register',{failureRedirect:'/usersAdd' , failureFlash: true}), usersControllerView.usersPaginate.bind(usersControllerView)); // Inyectamos passport como un middleware. // registerPost 

sessionRouter.post("/login", passport.authenticate('login',{failureRedirect:'/login' , failureFlash: true}), sessionsController.postLogin.bind(sessionsController));  // registerPost 

sessionRouter.get("/loginGithub", passport.authenticate('github',{scope:['user:email']}), async(req,res)=>{});  // Aca hace la redireccion a github para que nos loguiemos, y luego le envia la ingormasion de loguea a la direccion de callback que cargamos en github
// scope:['user:email'] Es el dato que queremos obtener de git
sessionRouter.get("/loginGithub-callback", passport.authenticate('github',{failureRedirect:'/login' , failureFlash: true}), async(req,res)=>{ // Y aca es donde github envia los datos que obtubimos en la strategy github
  res.redirect("/realTimeProducts")
});

sessionRouter.delete("/register", sessionsController.deleteRegister.bind(sessionsController));

sessionRouter.post("/resetPassword", sessionsController.resetPassword.bind(sessionsController));

module.exports = sessionRouter
