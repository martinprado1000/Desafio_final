const UsersService = require("../services/usersService")

class ServicesControllerView {
    constructor(){
        this.usersService = new UsersService 
    }

    async users(req,res){
        const isAdmin = req.user?.rol == "admin" ? true : false;
        const data = await this.usersService.get()
        res.render("users.handlebars", {data, isAdmin});
    }

    async usersPaginate(req,res){
        const userSession = req.user?.name;
        const isAdmin = req.user?.rol == "admin" ? true : false;
        const query = req.query
        const result = await this.usersService.getPaginate(query)
        const data = result.data;
        const rol = req.user?.rol
        res.render("users.handlebars", {data , title:"Users", userSession, rol, isAdmin });
    }
    
    async usersPid(req,res){
        const userSession = req.user?.name;
        const isAdmin = req.user?.rol == "admin" ? true : false;
        const id = req.params.uid
        const result = await this.usersService.getById(id)
        const data = result.data;
        const rol = req.user?.rol
        res.render("usersPid.handlebars", {data , title:"Edit user", userSession, rol, isAdmin });
    }

    async usersAdd(req,res){
        const userSession = req.user?.name;
        const isAdmin = req.user?.rol == "admin" ? true : false;
        const rol = req.user?.rol
        res.render("usersAdd.handlebars", {title:"Add user", userSession, rol, isAdmin });
    }

}

module.exports = ServicesControllerView;