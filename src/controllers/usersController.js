const UsersService = require("../services/usersService")

class ServicesController {
    constructor(){
        this.usersService = new UsersService 
    }

    async get(req,res){
        const result = await this.usersService.get()
        res.json(result)
    }
    
    async getPaginate(req,res){
        const query = req.query;
        console.log(query)
        const result = await this.usersService.getPaginate(query)
        res.json(result)
    }

    async getById(req,res){
        const id = req.params.uid
        const result = await this.usersService.getById(id)
        res.json(result)
    }

    async post(req,res){
        const body = req.body
        const result = await this.usersService.post(body)
        res.json(result)
    }

    async put(req,res){
        const id = req.params.uid
        const body = req.body
        const result = await this.usersService.put(id,body)
        res.json(result)
    }

    async delete(req,res){
        const id = req.params.uid
        const result = await this.usersService.delete(id)
        res.json(result)
    }

}

module.exports = ServicesController;