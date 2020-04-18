/**
 * this service provides product logic
 */
const _ = require('lodash')
const Joi = require('joi')
const helper = require('../common/helper')
const logger = require('../common/logger')
const models = require('../models')

const Product = models.Product




/**
 * create Product
 * @param {String} currentUserId current User Id
 * @param {Object} data product data
 * @returns {Object} created Product
 */
const createProduct = async (currentUserId ,data)=>{
    data.user = currentUserId
    return Product.create(data)

}

createProduct.schema = {
    currentUserId: Joi.any().required(), // internal data, no need to validate it
    data: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      imageList: Joi.array().items(Joi.string()),
      sku: Joi.array().items(Joi.string())
      
    }).required()
  }
/**
 * get all product
 * @returns {Array} Products List
 */
const getAll = async (criteria)=>{
      // build filter object
  const filter = { deleted: false }
  if (criteria.keyword) {
    filter.$or = [{ question: new RegExp(criteria.keyword, 'i') }, { helpText: new RegExp(criteria.keyword, 'i') },
      { labelText: new RegExp(criteria.keyword, 'i') }]
  }


  // query total count
  const totalCount = await Product.count(filter)
  // query records
  // for sorting, add second sorting by _id if sortColumn is not id, so that result order is determined
  if (criteria.sortColumn === 'id') {
    criteria.sortColumn = '_id'
  }
  let sortStr = `${criteria.sortOrder.toLowerCase() === 'asc' ? '' : '-'}${criteria.sortColumn}`
  if (criteria.sortColumn !== '_id') {
    sortStr += ' _id'
  }
  let p = Product.find(filter).sort(sortStr).skip(criteria.skip)
  if (criteria.limit) {
    p = p.limit(criteria.limit)
  }
  const results = await p
  return { totalCount, results }

}
getAll.schema = {
    criteria: Joi.object().keys({
      keyword: Joi.string(),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1),
      sortColumn: Joi.string().valid('id', 'title').default('createdOn'),
      sortOrder: Joi.sortOrder()
    })
  }



/**
 * get product by Id
 * @param {Stirng} ProductId product Id
 * @returns {Object} product
 */
const getProduct = async (ProductId)=>{

    const product = await helper.ensureExists(Product, { _id: ProductId, deleted: false })
        return product
}

getProduct.schema = {
  ProductId: Joi.id() // defined in app-bootstrap
  }


/**
 * update product 
 * @param {String} ProductId Product Id
 * @returns {Object} product
 */
const updateProduct = async (ProductId,data)=>{
    const product = await helper.ensureExists(Product, { _id: ProductId, deleted: false })
    _.assignIn(product, data)
    return product.save()

}
updateProduct.schema = {
    ProductId: Joi.id(), // defined in app-bootstrap
    data: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      imageList: Joi.array().items(Joi.string()),
      sku: Joi.array().items(Joi.string())
      
    })
  }

/**
 * delete Product
 * @param {String}
 */
const deleteProduct = async (productId)=>{
    const product = await helper.ensureExists(Product, { _id: productId, deleted: false })
    product.deleted = true
    await product.save()

}

deleteProduct.schema = {
    productId: Joi.id() // defined in app-bootstrap
  }



module.exports = {
    createProduct,
    getAll,
    getProduct,
    updateProduct,
    deleteProduct
}

logger.buildService(module.exports)
