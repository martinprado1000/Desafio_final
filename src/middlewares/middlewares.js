// Middleware chequeo si ya hay una sesion activa
const userMiddleware = (req, res, next) => {
    if (!req.user) {
    return res.redirect("/login");
  }
  return next();
}

// Middleware chequeo si es admin o premium
const isAdmin = (req, res, next) => {
  if (req.user.rol != "admin" && req.user.rol != "premium") {
  return res.redirect("/login");
}
return next();
}

const isUser = (req, res, next) => {
    if (req.user.rol != "user") {
    return res.redirect("/login");
  }
  return next();
  }

const sessionMiddleware = (req, res, next) => { 
    if (req.user) {  // recordar que passport deja la session en req.user
      return res.redirect("/realTimeProducts");
    }
    return next();
  };

module.exports = {userMiddleware,isAdmin,sessionMiddleware,isUser}