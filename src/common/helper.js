/**
 * This file defines helper methods
 */
const _ = require('lodash')
const errors = require('./errors')
const config = require('config')
const bcrypt = require('bcryptjs')
const util = require('util')
const logger = require('./logger')
const nodemailer = require('nodemailer')
const models = require('../models')

global.Promise.promisifyAll(bcrypt)

const transporter = nodemailer.createTransport(_.extend(config.EMAIL, { logger }))

const User = models.User

/**
 * Wrap async function to standard express function
 * @param {Function} fn the async function
 * @returns {Function} the wrapped function
 */
function wrapExpress (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

/**
 * Wrap all functions from object
 * @param obj the object (controller exports)
 * @returns {Object|Array} the wrapped object
 */
function autoWrapExpress (obj) {
  if (_.isArray(obj)) {
    return obj.map(autoWrapExpress)
  }
  if (_.isFunction(obj)) {
    if (obj.constructor.name === 'AsyncFunction') {
      return wrapExpress(obj)
    }
    return obj
  }
  _.each(obj, (value, key) => {
    obj[key] = autoWrapExpress(value)
  })
  return obj
}

/**
 * Ensure entity exists for given criteria. Return error if no result.
 * @param {Object} Model the mongoose model to query
 * @param {Object|String|Number} criteria the criteria (if object) or id (if string/number)
 * @returns {Object} the found entity
 */
async function ensureExists (Model, criteria) {
  let query
  let byId = true
  if (_.isObject(criteria)) {
    byId = false
    query = Model.findOne(criteria)
  } else {
    query = Model.findById(criteria)
  }
  const result = await query
  if (!result) {
    let msg
    if (byId) {
      msg = util.format('%s not found with id: %s', Model.modelName, criteria)
    } else {
      msg = util.format('%s not found with criteria: %j', Model.modelName, criteria)
    }
    throw new errors.NotFoundError(msg)
  }
  return result
}

/**
 * Hash the given text.
 *
 * @param {String} text the text to hash
 * @returns {String} the hashed string
 */
async function hashString (text) {
  return bcrypt.hashAsync(text, config.PASSWORD_HASH_SALT_LENGTH)
}

/**
 * Validate that the hash is actually the hashed value of plain text
 *
 * @param {String} text   the text to validate
 * @param {String} hash   the hash to validate
 * @returns {Boolean} whether it is valid
 */
async function validateHash (text, hash) {
  return bcrypt.compareAsync(text, hash)
}

/**
 * Send email
 * @param {String} subject the subject
 * @param {String} textBody the email body text
 * @param {Array} recipients the to emails
 * @param {String} fromEmail the from email, if not provided, then configured from email is used
 */
async function sendEmail (subject, textBody, recipients, fromEmail) {
  const req = {
    from: fromEmail || config.FROM_EMAIL,
    to: recipients.join(','),
    subject,
    text: textBody
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail(req, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Generate random password.
 * @returns {String} generated random password
 */
function generatePassword () {
  let password = ''
  for (let i = 1; i <= 6; i += 1) {
    password += Math.floor(Math.random() * 10)
  }
  return password
}







 /**
  * Generate aliExpress Product URL
  * @param {String} productId 
  * @returns {String} url
  */
 const generateAliExpressUrl = (productId)=>{
    return `https://www.aliexpress.com/item/${productId}.html`
}



 /**
 * generate sku of a product
 * @param {Array} arr sku Arrays array=  document.querySelectorAll('.sku-property')
 * @returns {Array} skus array
 */
const generateskus = async (skuArray)=>{
  let results = []
  await extractSkus(skuArray,0,results)
  return results
}
module.exports = {
  wrapExpress,
  autoWrapExpress,
  ensureExists,
  hashString,
  validateHash,
  sendEmail,
  generatePassword,
  generateAliExpressUrl,
  generateskus
}
