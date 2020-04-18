/**
 * Generate invalid test data for joi schema.
 */
const { Jom, Reason } = require('./testConstants');
const format = require('string-format');
const _ = require('lodash');

const generateContent = (length) => {
  const result = new Array(length + 1).join('A');
  return result;
};

class JodItem {
  constructor() {
    this._data = [];
    this._isNumber = false;
    this._isInteger = false;
    this._isString = false;
    this._isObject = false;
    this._isArray = false;
    this._isDate = false;
    this._isBoolean = false;
  }

  append(item) {
    const found = this._data.find(data => data.message === item.message && data.reason === item.reason && _.eq(data.value, item.value));
    if (!found) {
      this._data.push(item);
    }
  }

  get data() {
    return this._data;
  }

  get isNumber() {
    return this._isNumber;
  }

  set isNumber(value) {
    this._isNumber = value;
  }

  get isInteger() {
    return this._isInteger;
  }

  set isInteger(value) {
    this._isNumber = value;
    this._isInteger = value;
  }

  get isString() {
    return this._isString;
  }

  set isString(value) {
    this._isString = value;
  }

  get isObject() {
    return this._isObject;
  }

  set isObject(value) {
    this._isObject = value;
  }

  get isArray() {
    return this._isArray;
  }

  set isArray(value) {
    this._isArray = value;
  }

  get isDate() {
    return this._isDate;
  }

  set isDate(value) {
    this._isDate = value;
  }

  get isBoolean() {
    return this._isBoolean;
  }

  set isBoolean(value) {
    this._isBoolean = value;
  }

  integer() {
    this.isInteger = true;
    this.number();
    this.append({ message: Jom.mustInteger, reason: Reason.float, value: 12.3 });
    this.append({ message: Jom.mustInteger, reason: Reason.beyondInt, value: 1 + Number.MAX_SAFE_INTEGER });
    return this;
  }

  number() {
    this.isNumber = true;
    this.append({ message: Jom.mustNumber, reason: Reason.string, value: 'abc' });
    this.append({ message: Jom.mustNumber, reason: Reason.boolean, value: true });
    return this;
  }

  positive() {
    this.append({ message: Jom.mustPositive, reason: Reason.negative, value: -1 });
    this.append({ message: Jom.mustPositive, reason: Reason.zero, value: 0 });
    return this;
  }

  required() {
    let message = Jom.mustString;
    if (this.isObject) {
      message = Jom.mustObject;
    } else if (this.isArray) {
      message = Jom.mustArray;
    } else if (this.isNumber) {
      message = Jom.mustNumber;
    }
    this.append({ message, reason: Reason.null, value: null });

    if (this.isString) {
      this.append({ message: Jom.noEmpty, reason: Reason.empty, value: '' });
    }
    this.append({ message: Jom.isRequired, reason: Reason.undefined, value: undefined });
    return this;
  }

  string() {
    this.isString = true;
    this.append({ message: Jom.mustString, reason: Reason.integer, value: 123 });
    this.append({ message: Jom.mustString, reason: Reason.boolean, value: true });
    this.append({ message: Jom.mustString, reason: Reason.object, value: { a: 1 } });
    return this;
  }

  trim() {
    return this;
  }

  max(num) {
    if (this.isString) {
      const content = generateContent(num) + 'A';
      this.append({ message: format(Jom.lengthLessOrEqual, num), reason: Reason.tooLong, value: content });
    } else if (this.isNumber) {
      this.append({ message: format(Jom.lessOrEqual, num), reason: Reason.tooBig, value: num + 1 });
      this._data = this.data.filter(item => item.reason !== Reason.beyondInt);
    }
    return this;
  }

  min(num) {
    if (this.isNumber) {
      this.append({ message: format(Jom.greaterOrEqual, num), reason: Reason.tooSmall, value: num - 1 });
    }
    return this;
  }

  default(/* num */) {
    if (this.isNumber) {
      this._data = this.data.filter(item => !item.message.startsWith('must be larger than or equal to'));
      this._data = this.data.filter(item => !item.message.startsWith('must be less than or equal to'));
    }
    this._data = this.data.filter(item => !_.eq(item.value, undefined));
    return this;
  }

  object() {
    this.isObject = true;
    this.append({ message: Jom.mustObject, reason: Reason.integer, value: 123 });
    this.append({ message: Jom.mustObject, reason: Reason.boolean, value: true });
    return this;
  }

  keys() {
    this.append({ message: Jom.mustObject, reason: Reason.null, value: null });
    this.append({ message: Jom.isRequired, reason: Reason.undefined, value: undefined });
    return this;
  }

  optional() {
    this._data = this.data.filter(item => item.reason !== Reason.undefined);
    return this;
  }

  array() {
    this.isArray = true;
    this.append({ message: Jom.mustArray, reason: Reason.integer, value: 123 });
    this.append({ message: Jom.mustArray, reason: Reason.boolean, value: true });
    this.append({ message: Jom.mustArray, reason: Reason.object, value: { a: 1 } });
    return this;
  }

  items() {
    return this;
  }

  date() {
    this.isDate = true;
    this.append({ message: Jom.mustDate, reason: Reason.boolean, value: true });
    this.append({ message: Jom.mustDate, reason: Reason.object, value: { a: 1 } });
    this.append({ message: Jom.mustDate, reason: Reason.emptyArray, value: [] });
    this.append({ message: Jom.mustDate, reason: Reason.string, value: 'abcd' });
    this.append({ message: Jom.mustDate, reason: Reason.noDateFormat, value: '2019-05-32T12:12:20.000Z' });
    this.append({ message: Jom.mustDate, reason: Reason.noDateFormat, value: '2019/05/30T12:12:20.000Z' });
    return this;
  }

  valid() {
    if (this.isString) {
      this.append({ message: Jom.notInEnum, reason: Reason.beyondEnum, value: 'NOT IN ENUM' });
    }
    return this;
  }

  allow(value) {
    this._data = this.data.filter(item => !_.eq(value, item.value));
    return this;
  }

  boolean() {
    this.isBoolean = true;
    this.append({ message: Jom.mustBoolean, reason: Reason.integer, value: 123 });
    this.append({ message: Jom.mustBoolean, reason: Reason.string, value: 'abcd' });
    this.append({ message: Jom.mustBoolean, reason: Reason.object, value: { a: 1 } });
    this.append({ message: Jom.mustBoolean, reason: Reason.emptyArray, value: [] });
    this.append({ message: Jom.mustBoolean, reason: Reason.null, value: null });
    this.append({ message: Jom.mustBoolean, reason: Reason.undefined, value: undefined });
    return this;
  }
}
module.exports.JodItem = JodItem;

module.exports.integer = () => {
  const jod = new JodItem();
  return jod.integer();
};

module.exports.number = () => {
  const jod = new JodItem();
  return jod.number();
};

module.exports.string = () => {
  const jod = new JodItem();
  return jod.string();
};

module.exports.object = () => {
  const jod = new JodItem();
  return jod.object();
};

module.exports.array = () => {
  const jod = new JodItem();
  return jod.array();
};

module.exports.date = () => {
  const jod = new JodItem();
  return jod.date();
};

module.exports.boolean = () => {
  const jod = new JodItem();
  return jod.boolean();
};
