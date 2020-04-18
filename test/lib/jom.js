/**
 * Generate error message for joi validation.
 */
const _ = require('lodash');
const format = require('string-format');

const LARGE_OR_EQUAL = '"{0}" must be larger than or equal to {1}';
const IS_REQUIRED = '"{0}" is required';
const MUST_POSITIVE = '"{0}" must be a positive number';
const MUST_NUMBER = '"{0}" must be a number';

class JomItem {
  constructor() {
    this._data = [];
  }

  append(message) {
    this._data.push(message);
  }

  get message() {
    return this._data.join(', ');
  }

  largerOrEqual(params, edge) {
    if (_.isArray(params)) {
      params.forEach(param => this.largerOrEqual(param));
      return this;
    }
    this.append(format(LARGE_OR_EQUAL, String(params), edge));
    return this;
  }

  required(params) {
    if (_.isArray(params)) {
      params.forEach(param => this.required(param));
      return this;
    }
    this.append(format(IS_REQUIRED, String(params)));
    return this;
  }

  mustPositive(params) {
    if (_.isArray(params)) {
      params.forEach(param => this.mustPositive(param));
      return this;
    }
    this.append(format(MUST_POSITIVE, String(params)));
    return this;
  }

  mustNumber(params) {
    if (_.isArray(params)) {
      params.forEach(param => this.mustNumber(param));
      return this;
    }
    this.append(format(MUST_NUMBER, String(params)));
    return this;
  }
}

module.exports.largerOrEqual = (param, edge) => {
  const jom = new JomItem();
  return jom.largerOrEqual(param, edge);
};

module.exports.required = (param) => {
  const jom = new JomItem();
  return jom.required(param);
};

module.exports.mustPositive = (param) => {
  const jom = new JomItem();
  return jom.mustPositive(param);
};

module.exports.mustNumber = (param) => {
  const jom = new JomItem();
  return jom.mustNumber(param);
};
