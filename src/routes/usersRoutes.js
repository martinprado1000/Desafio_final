const {Router} = require("express")

const UsersController = require("../controllers/usersController")

const userRouter = new Router()

const usersController = new UsersController();

userRouter.get("/users",usersController.getPaginate.bind(usersController))
userRouter.get("/users/:uid",usersController.getById.bind(usersController))
userRouter.post("/users",usersController.post.bind(usersController))
userRouter.put("/users/:uid",usersController.put.bind(usersController))
userRouter.delete("/users/:uid",usersController.delete.bind(usersController))

module.exports = userRouter

