/**
 * This service provides security related operations
 */
const Joi = require('joi')
const config = require('config')
const logger = require('../common/logger')
const errors = require('../common/errors')
const helper = require('../common/helper')
const models = require('../models')
const jwt = require('jsonwebtoken')
const ms = require('ms')
const uuid = require('uuid/v4')

const User = models.User

/**
 * Login by email and password
 * @param {Object} credentials the credentials
 * @returns {Object} the token and user data
 */
async function login (credential) {
  // find user by email
  const user = await User.findOne({ email: credential.email })
  if (!user) {
    throw new errors.UnauthorizedError('Wrong credential')
  }

  // compare hashed password
  const compareRes = await helper.validateHash(credential.password, user.passwordHash)
  if (!compareRes) {
    throw new errors.UnauthorizedError('Wrong credential')
  }
  // generate token
  const token = jwt.sign({ id: user._id, email: user.email },
    config.JWT_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRATION })

  return { token, user: user }
}

login.schema = {
  credential: Joi.object().keys({
    email: Joi.email(), // defined in app-bootstrap
    password: Joi.string().required()
  }).required()
}

/**
 * Forgot password. Forgot password email is sent.
 * @param {Object} data the data containing email
 */
async function forgotPassword (data) {
  // find user by email
  const user = await helper.ensureExists(User, { email: data.email })
  // generate forgot password token
  user.forgotPasswordToken = uuid()
  user.forgotPasswordTokenValidUntil = new Date(new Date().getTime() + ms(config.FORGOT_PASSWORD_TOKEN_EXPIRATION))
  await user.save()

  // send forgot password email
  // there are two {token} in email body, replace it twice
  const emailTemplate = require('../emailTemplate/forgotPasswordEmail')
  const emailBody = emailTemplate.body
    .replace('{token}', user.forgotPasswordToken).replace('{token}', user.forgotPasswordToken)
  await helper.sendEmail(emailTemplate.subject, emailBody, [data.email])
}

forgotPassword.schema = {
  data: Joi.object().keys({
    email: Joi.email() // defined in app-bootstrap
  }).required()
}

/**
 * Change forgot password.
 * @param {Object} data the data to change forgot password, it contains forgot password token
 */
async function changeForgotPassword (data) {
  // find user by token
  const user = await helper.ensureExists(User, { forgotPasswordToken: data.token })
  // check forgot password token expiration
  if (!user.forgotPasswordTokenValidUntil || user.forgotPasswordTokenValidUntil < new Date()) {
    throw new errors.BadRequestError('Forgot password token expired')
  }
  // generate new password
  const password = helper.generatePassword()
  user.passwordHash = await helper.hashString(password)
  user.forgotPasswordToken = null
  user.forgotPasswordTokenValidUntil = null
  await user.save()
  // send email
  const emailTemplate = require('../emailTemplate/changedForgotPasswordEmail')
  const emailBody = emailTemplate.body.replace('{password}', password)
  await helper.sendEmail(emailTemplate.subject, emailBody, [user.email])
}

changeForgotPassword.schema = {
  data: Joi.object().keys({
    token: Joi.string().required()
  }).required()
}

/**
 * Reset current user's password.
 * @param {Object} user the current user
 * @param {Object} data the data to change password
 */
async function resetPassword (user, data) {
  // compare hashed password
  const compareRes = await helper.validateHash(data.oldPassword, user.passwordHash)
  if (!compareRes) {
    throw new errors.UnauthorizedError('Wrong old password')
  }
  // update password
  user.passwordHash = await helper.hashString(data.newPassword)
  await user.save()
}

resetPassword.schema = {
  user: Joi.object().required(),
  data: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  }).required()
}

module.exports = {
  login,
  forgotPassword,
  changeForgotPassword,
  resetPassword
}

logger.buildService(module.exports)
