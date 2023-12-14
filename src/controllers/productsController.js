const ProductsService = require("../services/productsService")

class ProductsController {
    constructor(){
        this.productsService = new ProductsService 
    }

    async get(req,res){
        const result = await this.productsService.get()
        res.json(result)
    }
    
    async getPaginate(req,res){
        const data = req.query
        const result = await this.productsService.getPaginate(data)
        res.json(result)
    }

    async getById(req,res){
        const id = req.params.pid
        const result = await this.productsService.getById(id)
        res.json(result)
    }

    async post(req,res){
        const body = req.body
        body.owner = req.user?.email  // Al body le agrego al creador del producto
        const result = await this.productsService.post(body)
        res.json(result)
    }

    async put(req,res){
        const id = req.params.pid
        const body = req.body
        const result = await this.productsService.put(id,body)
        res.json(result)
    }

    async delete(req,res){
        const id = req.params.pid
        const result = await this.productsService.delete(id)
        res.json(result)
    }

}

module.exports = ProductsController;