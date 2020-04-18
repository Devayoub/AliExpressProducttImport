const _ = require('lodash')
const mongoose = require('mongoose')

/**
 * The Product schema.
 */

const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  imageList: {
    required: false,
    type: []
  },
  sku: {
    required: false,
    type: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deleted: {
    type:Boolean,
    default : false
  }
  
}, { timestamps: { createdAt: true, updatedAt: true} })

module.exports = schema