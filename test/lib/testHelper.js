const _ = require('lodash');
const config = require('config');
const request = require('superagent');
const format = require('string-format');
const httpStatus = require('http-status');
const should = require('should');

const models = require('../../src/models');

const BASE_URL = `http://localhost:${config.port}`;

const DIRECTOR_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFSUQiOiJFSUQwMDEiLCJyb2xlIjoiRGlyZWN0b3IiLCJuYW1lIjoiVXNlciAwMDEiLCJ1c2VybmFtZSI6InVzZXIwMDEiLCJ1c2VyQ29tcGV0ZW5jeSI6IiIsImlhdCI6MTU1ODAyMDQyNywiZXhwIjoxNTU4NjI1MjI3fQ.NvDTgJp1Dw_3LifyeV0XNJ3T1BAs7BU_-KL2z4Klmlw'; // eslint-disable-line max-len
const MANAGER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFSUQiOiJFSUQwMDIiLCJyb2xlIjoiTWFuYWdlciIsIm5hbWUiOiJVc2VyIDAwMiIsInVzZXJuYW1lIjoidXNlcjAwMiIsInVzZXJDb21wZXRlbmN5IjoiIiwiaWF0IjoxNTU4MDIwNDk4LCJleHAiOjE1NTg2MjUyOTh9.TWLGwjZRxmDO5ZI-EEut413T1_lJpGO8RJm11IPx_UE'; // eslint-disable-line max-len
const LEADER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFSUQiOiJFSUQwMDMiLCJyb2xlIjoiTGVhZGVyIiwibmFtZSI6IlVzZXIgMDAzIiwidXNlcm5hbWUiOiJ1c2VyMDAzIiwidXNlckNvbXBldGVuY3kiOiIiLCJpYXQiOjE1NTgwMjA1MjcsImV4cCI6MTU1ODYyNTMyN30.kDOrS3zNQhsW6KWg02YJ2hE870toYBPH4-ZjyF6x1f4'; // eslint-disable-line max-len
const EXPIRED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFSUQiOiJFSUQwMDMiLCJyb2xlIjoiTGVhZGVyIiwibmFtZSI6IlVzZXIgMDAzIiwidXNlcm5hbWUiOiJ1c2VyMDAzIiwidXNlckNvbXBldGVuY3kiOiIiLCJpYXQiOjEyNTcxMjAyMDIsImV4cCI6MTI1NzcyNTAwMn0.DXID-xYFTKCffThhNTQVVUaGR4wV8-XpM6gohwVbxIo'; // eslint-disable-line max-len
const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFSUQiOiJFSUQwMDMiLCJyb2xlIjoiTGVhZGVyIiwibmFtZSI6IlVzZXIgMDAzIiwidXNlcm5hbWUiOiJ1c2VyMDAzIiwidXNlckNvbXBldGVuY3kiOiIiLCJpYXQiOjE1NTcxMjAyMDIsImV4cCI6MTU1NzcyNTAwMn0.F5RzCUZBkCeshEfnwDs4t7TF-eA9-cscw17iFuteNZQ'; // eslint-disable-line max-len
const LEADER2_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFSUQiOiJFSUQwMDQiLCJyb2xlIjoiTGVhZGVyIiwibmFtZSI6IlVzZXIgMDA0IiwidXNlcm5hbWUiOiJ1c2VyMDA0IiwidXNlckNvbXBldGVuY3kiOiIiLCJpYXQiOjE1NTgwMjA3OTUsImV4cCI6MTU1ODYyNTU5NX0.LyQbj0phUaJmNkQghKNyAxpAUijpccFlrJZRcKRQ83o'; // eslint-disable-line max-len
const DIRECTOR2_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFSUQiOiJFSUQwMTAiLCJyb2xlIjoiRGlyZWN0b3IiLCJuYW1lIjoiVXNlciAwMTAiLCJ1c2VybmFtZSI6InVzZXIwMTAiLCJ1c2VyQ29tcGV0ZW5jeSI6IiIsImlhdCI6MTU1ODAyMDcxMywiZXhwIjoxNTU4NjI1NTEzfQ.cfz0Zz818uB2ExzQ2JwhTzcLN_8vdPS_Ay6AaAXwtj4'; // eslint-disable-line max-len

const WAIT_TIME = 100;

/**
 * Handle the errors
 */
function handleErrors(promise) {
  return promise.catch((err) => {
    if (err.status === 400 || err.status === 401 || err.status === 403
      || err.status === 404 || err.status === 409) {
      return err.response;
    }
    throw err;
  });
}
/**
 * Sleep with time from input
 */
async function sleep() {
  await new Promise((resolve) => {
    setTimeout(resolve, WAIT_TIME);
  });
}


/**
 * Call mocha it function.
 * @param {String} title mocha test method title
 * @param {String} funName function to be called
 * @param {*} fieldPath field path split by dot
 * @param {*} params params used by fun
 * @param {*} message error message
 */
const doIt = (title, fun, fieldPath, params, message, noFormat = false) => {
  it(title, function* () {
    const keys = fieldPath.split('.');
    try {
      yield fun(...params);
      throw new Error('should not throw error here');
    } catch (err) {
      if (keys.length === 1) {
        if (noFormat) {
          should.equal(message, err.message);
        } else {
          should.equal(format(Jom.childFail, keys[0], message), err.message);
        }
      } else if (keys.length === 2) {
        if (noFormat) {
          should.equal(message, err.message);
        } else {
          const key0 = String(keys[0]);
          if (key0.endsWith(']')) {
            const keyFirst = key0.substring(0, key0.indexOf('['));
            const arrayTitle = 'child "{0}" fails because ["{0}" at position 0 fails because [child "{1}" fails because ["{1}" {2}]]]';
            should.equal(format(arrayTitle, keyFirst, keys[1], message), err.message);
          } else {
            should.equal(format(Jom.childChildFail, keys[0], keys[1], message), err.message);
          }
        }
      } else {
        throw new Error('should not throw error here');
      }
    }
  });
};

/**
 * Mocha fail common handler.
 * @param {Object} req a request define
 */
const failIt = (req) => {
  it(req.title, async () => {
    try {
      await req.operation(...req.params);
      throw ShouldNotBeHere;
    } catch (err) {
      should.equal(req.message, _.get(err, PathOfMessage));
      should.equal(req.status, err.status);
    }
  });
};


/**
 * Set request Headers
 */
const setheaders = (req, token) => {
  if (token) {
    if (token.length < 20) {
      req.set('Authorization', `${token}`);
    } else {
      req.set('Authorization', `Bearer ${token}`);
    }
  }
  return req
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
};

/**
 * Uses superagent to proxy get request
 * @param {String} url the url
 * @param {String} token the token
 * @returns {Object} the response
 */
const getRequest = async (url, token) => {
  const ret = setheaders(request.get(url), token);
  return ret;
};

/**
 * Uses superagent to proxy put request
 * @param {String} url the url
 * @param {Object} body the request body
 * @param {String} token the token
 * @returns {Object} the response
 */
const putRequest = async (url, body, token) => {
  const ret = setheaders(request.put(url).send(body), token);
  return ret;
};

/**
 * Uses superagent to proxy patch request
 * @param {String} url the url
 * @param {Object} body the request body
 * @param {String} token the token
 * @returns {Object} the response
 */
const patchRequest = async (url, body, token) => {
  const ret = setheaders(request.patch(url).send(body), token);
  return ret;
};

/**
 * Uses superagent to proxy post request
 * @param {String} url the url
 * @param {Object} body the request body
 * @param {String} token the token
 * @returns {Object} the response
 */
const postRequest = async (url, body, token) => {
  const ret = setheaders(request.post(url).send(body), token);
  return ret;
};

/**
 * Uses superagent to proxy delete request
 * @param {String} url the url
 * @param {String} token the token
 * @returns {Object} the response
 */
const deleteRequest = async (url, token) => {
  const ret = setheaders(request.del(url), token);
  return ret;
};

/**
 * Return the authorization fail request.
 * @param {String} url url endpoint
 */
const authFailRequests = (url, body) => [
  {
    title: '401 - should fail when null token request',
    params: body ? [url, body, null] : [url, null],
    status: httpStatus.UNAUTHORIZED,
    message: constants.ErrorMessage.Unauthorized
  },
  {
    title: '401 - should fail when invalid token request',
    params: body ? [url, body, INVALID_TOKEN] : [url, INVALID_TOKEN],
    status: httpStatus.UNAUTHORIZED,
    message: constants.ErrorMessage.Expired
  },
  {
    title: '401 - should fail when token is expired',
    params: body ? [url, body, EXPIRED_TOKEN] : [url, EXPIRED_TOKEN],
    status: httpStatus.UNAUTHORIZED,
    message: constants.ErrorMessage.Expired
  },
  {
    title: '403 - should fail when not allow manager to call this service',
    params: body ? [url, body, MANAGER_TOKEN] : [url, MANAGER_TOKEN],
    status: httpStatus.FORBIDDEN,
    message: constants.ErrorMessage.Forbidden
  },
  {
    title: '403 - should fail when not allow director to call this service',
    params: body ? [url, body, DIRECTOR_TOKEN] : [url, DIRECTOR_TOKEN],
    status: httpStatus.FORBIDDEN,
    message: constants.ErrorMessage.Forbidden
  }
];
const clearDB = async () => {
  await models.User.deleteMany({})
  await models.Product.deleteMany({})
}
module.exports = {
  BASE_URL,
  DIRECTOR_TOKEN,
  DIRECTOR2_TOKEN,
  MANAGER_TOKEN,
  LEADER_TOKEN,
  LEADER2_TOKEN,
  EXPIRED_TOKEN,
  INVALID_TOKEN,
  handleErrors,
  doIt,
  failIt,
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
  patchRequest,
  authFailRequests,
  sleep,
  clearDB
};
