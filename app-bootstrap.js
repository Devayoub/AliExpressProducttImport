/**
 * App bootstrap
 */
global.Promise = require('bluebird')
const Joi = require('joi')

Joi.optionalId = () => Joi.string().regex(/^[a-zA-Z0-9]{24}$/)
Joi.id = () => Joi.optionalId().required()
// email is case insensitive, so lowercase it
Joi.email = () => Joi.string().email().lowercase().required()
Joi.sortOrder = () => Joi.string().valid('asc', 'desc', 'ASC', 'DESC').default('desc')
