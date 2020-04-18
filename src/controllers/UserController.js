/**
 * Controller for user endpoints
 */
const service = require('../services/UserService')

/**
 * Search users
 * @param req the request
 * @param res the response
 */
async function searchUsers (req, res) {
  res.send(await service.searchUsers(req.user, req.query))
}

/**
 * Create user
 * @param req the request
 * @param res the response
 */
async function createUser (req, res) {
  res.send(await service.createUser( req.body))
}

/**
 * Update user
 * @param req the request
 * @param res the response
 */
async function updateUser (req, res) {
  res.send(await service.updateUser(req.user, req.params.userId, req.body))
}

/**
 * Get user
 * @param req the request
 * @param res the response
 */
async function getUser (req, res) {
  res.send(await service.getUser(req.params.userId))
}


module.exports = {
  searchUsers,
  createUser,
  updateUser,
  getUser,

}
