/**
 * Constants used in test.
 */
module.exports.Jom = {
  mustInteger: 'must be an integer',
  mustNumber: 'must be a number',
  mustObject: 'must be an object',
  mustArray: 'must be an array',
  mustPositive: 'must be a positive number',
  mustString: 'must be a string',
  mustBoolean: 'must be a boolean',
  mustDate: 'must be a number of milliseconds or valid date string',
  notInEnum: 'not in enum',
  noEmpty: 'is not allowed to be empty',
  lengthLessOrEqual: 'length must be less than or equal to {0} characters long',
  lessOrEqual: 'must be less than or equal to {0}',
  greaterOrEqual: 'must be larger than or equal to {0}',
  isRequired: 'is required',
  noDateFormat: 'invalid date format',
  noEmptyArray: '"{0}" must contain at least 1 item',
  emptyArrayFail: '"{0}" must contain at least 1 item',
  childChildFail: 'child "{0}" fails because [child "{1}" fails because ["{1}" {2}]]',
  childFail: 'child "{0}" fails because ["{0}" {1}]',
  itTitle: 'should fail because {0} is {1}'
};

module.exports.Reason = {
  invalid: 'invalid',
  float: 'float',
  string: 'string',
  empty: 'empty',
  tooLong: 'too long',
  null: 'null',
  emptyArray: 'empty array',
  tooSmall: 'too small',
  tooBig: 'too big',
  undefined: 'removed',
  boolean: 'boolean',
  beyondInt: 'beyond max integer',
  negative: 'negative number',
  zero: 'zero',
  integer: 'integer',
  beyondEnum: 'out of enum scope',
  object: 'object',
  noDateFormat: 'invalid date format'
};

module.exports.ErrorMessage = {
  Unauthorized: 'Action is not allowed for anonymous!',
  Expired: 'Failed to authenticate jwt token.',
  Forbidden: 'You are not allowed to perform this action!',
  UserNotFound: 'User not found',
  ActivityNotFound: 'Activity not found',
  LevelNotFound: 'SubCompetencyLevel not found',
  SubCompNotFound: 'SubCompetency not found',
  CompetencyNotFound: 'Competency not found',
  EmployeeNotFound: 'Employee not found'
};

module.exports.ShouldNotBeHere = new Error('should not throw error here');
module.exports.PathOfMessage = 'response.body.message';
