/**
 * Scrap Product Controller
 */
const scrapProductService = require('../services/ScrapProductService')

/**
 * 
 * @param {Object} req the request
 * @param {Object} res the response
 * @returns {JSON} Product Object
 */
const scrapProduct = async (req,res)=>{
    res.send(await scrapProductService.scrapProduct(req.params.id))
 

}



module.exports = {
    scrapProduct
}