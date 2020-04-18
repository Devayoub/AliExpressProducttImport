/**
 * Controller for Product endpoints
 */
const service = require('../services/ProductService')
 

/**
 * @param {req} req the request 
 * @param {res} res the response
 */
const createProduct = async (req,res)=>{

    res.send(await service.createProduct(req.user._id,req.body))

}
 
/**
 * @param {req} req the request 
 * @param {res} res the response
 */
const getAll = async (req,res)=>{

    res.send(await service.getAll(req.query))

}
/**
 * @param {req} req the request 
 * @param {res} res the response
 */
const getProduct = async (req,res)=>{

    res.send(await service.getProduct(req.params.id))
}

/**
 * @param {req} req the request 
 * @param {res} res the response
 */
const updateProduct = async (req,res)=>{

    res.send(await service.updateProduct(req.params.id,req.body))
}

/**
 * @param {req} req the request 
 * @param {res} res the response
 */
const deleteProduct = async (req,res)=>{

    res.send(await service.deleteProduct(req.params.id))

}

module.exports = {
    createProduct,
    getAll,
    getProduct,
    updateProduct,
    deleteProduct
}
