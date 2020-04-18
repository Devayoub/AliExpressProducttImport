/**
 * This service provides operations of users
 */
const _ = require('lodash')
const Joi = require('joi')
const helper = require('../common/helper')
const logger = require('../common/logger')
const errors = require('../common/errors')
const models = require('../models')

const User = models.User

/**
 * Search users
 * @param {Object} currentUser the current users
 * @param {Object} criteria the search criteria
 * @returns {Object} the search result
 */
async function searchUsers (currentUser, criteria) {
  // build filter object
  const filter = {}
  if (criteria.name) {
    filter.name = new RegExp(criteria.name, 'i')
  }
  if (criteria.email) {
    filter.email = criteria.email
  }

  if (criteria.company) {
    filter.company = new RegExp(criteria.company, 'i')
  }
  if (criteria.phone) {
    filter.phone = new RegExp(criteria.phone, 'i')
  }
  if (criteria.keyword) {
    filter.$or = [{ name: new RegExp(criteria.keyword, 'i') }, { email: criteria.keyword.toLowerCase() }]
  }
  if (criteria.fullName) {
    filter.name = new RegExp(criteria.fullName, 'i')
  }
  

  // query total count
  const totalCount = await User.count(filter)
  // query records
  // for sorting, add second sorting by _id if sortColumn is not id, so that result order is determined
  if (criteria.sortColumn === 'id') {
    criteria.sortColumn = '_id'
  }
  let sortStr = `${criteria.sortOrder.toLowerCase() === 'asc' ? '' : '-'}${criteria.sortColumn}`
  if (criteria.sortColumn !== '_id') {
    sortStr += ' _id'
  }
  let p = User.find(filter).sort(sortStr).skip(criteria.skip)
  if (criteria.limit) {
    p = p.limit(criteria.limit)
  }
  const results = await p

  
  return { totalCount, results }
}

searchUsers.schema = {
  currentUser: Joi.object().required(),
  criteria: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    company: Joi.string(),
    phone: Joi.string(),
    skip: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(1),
    sortColumn: Joi.string().valid('id', 'name', 'email', 'role', 'company', 'phone',
      'createdOn', 'lastModifiedOn').default('createdOn'),
    sortOrder: Joi.sortOrder()
  })
}

/**
 * Create user. Password email is sent to user if no password is provided.
 * @param {Object} currentUser the current user
 * @param {Object} data the data to create user
 * @returns {Object} the created user
 */
async function createUser ( data) {

  // check whether email is already used
  const existing = await User.findOne({ email: data.email })
  if (existing) {
    throw new errors.ConflictError(`The email ${data.email} is already created`)
  }

  // generate password if not provided
  let generatedPassword = null
  if (!data.password) {
    generatedPassword = helper.generatePassword()
    data.password = generatedPassword
  }
  // hash password
  data.passwordHash = await helper.hashString(data.password)
  delete data.password
  
  const user = await User.create(data)


  return user
}

createUser.schema = {

  data: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.email(), // defined in app-bootstrap
    password: Joi.string(),
    company: Joi.string(),
    phone: Joi.string(),
    avatarUrl: Joi.string().uri()
  }).required()
}

/**
 * Update user. Password email is sent to user if no password is provided.
 * @param {Object} currentUser the current user
 * @param {String} userId the id of user to update
 * @param {Object} data the data to update user
 * @returns {Object} the updated user
 */
async function updateUser (currentUser, userId, data) {
  if (data.defaults) {
    helper.validateDefaults(data.defaults)
  }
  const user = await helper.ensureExists(User, userId)

  let generatedPassword = null

    // check whether email is already used by other user
    const existing = await User.findOne({ _id: { $ne: userId }, email: data.email })
    if (existing) {
      throw new errors.ConflictError(`The email ${data.email} is already used by other user`)
    }
    // generate password if not provided
    if (!data.password) {
      generatedPassword = helper.generatePassword()
      data.password = generatedPassword
    }
    // hash password
    data.passwordHash = await helper.hashString(data.password)
    delete data.password
  


    _.assignIn(user, data)
  
  user.lastModifiedBy = currentUser._id
  const updatedUser = await user.save()



  return updatedUser
}

updateUser.schema = {
  currentUser: Joi.object().required(),
  data: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.email(), // defined in app-bootstrap
    password: Joi.string(),
    company: Joi.string(),
    phone: Joi.string(),
    avatarUrl: Joi.string().uri()
  }).required()
}

/**
 * Get user.
 * @param {String} userId the id of user to get
 * @returns {Object} the user
 */
async function getUser (userId) {
  const user = await helper.ensureExists(User, userId)
  return helper.cleanAndPopulateDataForUser(user)
}

getUser.schema = {
  userId: Joi.id() // defined in app-bootstrap
}



module.exports = {
  searchUsers,
  createUser,
  updateUser,
  getUser,
}

logger.buildService(module.exports)
