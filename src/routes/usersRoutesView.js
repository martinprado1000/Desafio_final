const {Router} = require("express")
const {userMiddleware,isAdmin} = require("../middlewares/middlewares")

const UsersControllerViews = require("../controllers/usersControllerView")

const userRouterViews = new Router()

const usersControllerViews = new UsersControllerViews();

userRouterViews.get("/users", userMiddleware, isAdmin, usersControllerViews.usersPaginate.bind(usersControllerViews))
userRouterViews.get("/users/:uid", userMiddleware, isAdmin, usersControllerViews.usersPid.bind(usersControllerViews))
userRouterViews.get("/usersAdd", userMiddleware, isAdmin, usersControllerViews.usersAdd.bind(usersControllerViews))

module.exports = userRouterViews

