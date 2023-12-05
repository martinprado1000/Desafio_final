const {Router} = require("express")

const UsersControllerViews = require("../controllers/usersControllerView")

const userRouterViews = new Router()

const usersControllerViews = new UsersControllerViews();

// Middleware chequeo si ya hay una sesion activa
const userMiddleware = (req, res, next) => {
    if (!req.user) {
    return res.redirect("/login");
  }
  return next();
}

// Middleware chequeo si es admin
const isAdmin = (req, res, next) => {
  if (req.user.rol != "admin") {
  return res.redirect("/login");
}
return next();
}

userRouterViews.get("/users", userMiddleware, isAdmin, usersControllerViews.usersPaginate.bind(usersControllerViews))
userRouterViews.get("/users/:uid", userMiddleware, isAdmin, usersControllerViews.usersPid.bind(usersControllerViews))
userRouterViews.get("/usersAdd", userMiddleware, isAdmin, usersControllerViews.usersAdd.bind(usersControllerViews))

//userRouterViews.get("/realTimeUsersAdmin", userMiddleware, usersControllerViews.realTimeUsersAdmin.bind(usersControllerViews))
//userRouterViews.post("/users", usersControllerViews.usersAdd.bind(usersControllerViews))
//userRouterViews.put("/users/:pid", usersControllerViews.usersEdit.bind(usersControllerViews))
//userRouterViews.delete("/users/:pid", usersControllerViews.usersDelete.bind(usersControllerViews))
//userRouterViews.get("/realTimeUsers/:pid",usersControllerViews.getById.bind(usersControllerViews))




//userRouterViews.post("/realTimeUsers",usersControllerViews.post.bind(usersControllerViews))
//userRouterViews.put("/realTimeUsers/:pid",usersControllerViews.put.bind(usersControllerViews))
//userRouterViews.delete("/realTimeUsers/:pid",usersControllerViews.delete.bind(usersControllerViews))

module.exports = userRouterViews

