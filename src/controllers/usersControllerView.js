const UsersService = require("../services/usersService")

class ServicesControllerView {
    constructor(){
        this.usersService = new UsersService 
    }

    async users(req,res){
        const data = await this.usersService.get()
        res.render("users.handlebars", {data});
    }

    async usersPaginate(req,res){
        const userSession = req.user?.name;
        const query = req.query
        const result = await this.usersService.getPaginate(query)
        const data = result.data;
        res.render("users.handlebars", {data , title:"Users", userSession });
    }
    
    async usersPid(req,res){
        const userSession = req.user?.name;
        const id = req.params.uid
        const result = await this.usersService.getById(id)
        const data = result.data;
        res.render("usersPid.handlebars", {data , title:"Edit user", userSession });
    }

    async usersAdd(req,res){
        const userSession = req.user?.name;
        res.render("usersAdd.handlebars", {title:"Add user", userSession });
    }

    // async usersEdit(req,res){
    //     const body = req.body
    //     const result = await this.usersService.post(body)
    //     res.json(result)
    // }

    // async usersDelete(req,res){
    //     const id = req.params.pid
    //     const body = req.body
    //     const result = await this.usersService.put(id,body)
    //     res.json(result)
    // }

    // async userdelete(req,res){
    //     const id = req.params.pid
    //     const result = await this.usersService.delete(id)
    //     res.json(result)
    // }

}

module.exports = ServicesControllerView;