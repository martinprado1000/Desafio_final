const { Router } = require("express");
const {sessionMiddleware} = require("../middlewares/middlewares")

const SessionsControllerView = require("../controllers/sessionsControllerView")

const sessionRouterView = new Router()

const sessionsControllerView = new SessionsControllerView();

sessionRouterView.get("/register", sessionMiddleware, sessionsControllerView.register.bind(sessionsControllerView));
sessionRouterView.get("/login", sessionMiddleware, sessionsControllerView.login.bind(sessionsControllerView));
sessionRouterView.get("/recovery-password", sessionsControllerView.recoveryPassword.bind(sessionsControllerView));

module.exports = sessionRouterView
