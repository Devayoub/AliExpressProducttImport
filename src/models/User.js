const _ = require('lodash')
const mongoose = require('mongoose')
const validator = require('validator')

/**
 * The User schema.
 */
const schema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'email is invalid',
      isAsync: false
    }
  },
  passwordHash: {
    required: true,
    type: String
  },
  company: {
    required: false,
    type: String
  },
  phone: {
    required: false,
    type: String
  },
  forgotPasswordToken: {
    required: false,
    type: String
  },
  forgotPasswordTokenValidUntil: {
    required: false,
    type: Date
  },

  avatarUrl: {
    required: false,
    type: String
  }
}, { timestamps: { createdAt: true, updatedAt: true} })
schema.index({ email: 1 })

schema.index({ name: 1 })
module.exports = schema
