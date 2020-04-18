/**
 * Controller for security endpoints
 */
const service = require('../services/SecurityService')

/**
 * Login
 * @param req the request
 * @param res the response
 */
async function login (req, res) {
  res.send(await service.login(req.body))
}

/**
 * Forgot password, email will be sent.
 * @param req the request
 * @param res the response
 */
async function forgotPassword (req, res) {
  await service.forgotPassword(req.query)
  res.end()
}

/**
 * Change forgot password
 * @param req the request
 * @param res the response
 */
async function changeForgotPassword (req, res) {
  await service.changeForgotPassword(req.query)
  res.end()
}

/**
 * Change current user's password
 * @param req the request
 * @param res the response
 */
async function resetPassword (req, res) {
  await service.resetPassword(req.user, req.body)
  res.end()
}

module.exports = {
  login,
  forgotPassword,
  changeForgotPassword,
  resetPassword
}
