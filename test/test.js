/**
 * E2E test of the Aliexpress Web Scraper   App - API.
 */

process.env.NODE_ENV = 'test';


require('../app-bootstrap');

const config = require('config');
const mocha = require('mocha');
const coMocha = require('co-mocha');

coMocha(mocha);

describe('Aliexpress Web Scraper - API E2E Test', () => {

  /**
   * Sleep with time from input
   * @param time the time input
   */
  const sleep = time => new Promise((resolve) => {
    setTimeout(resolve, time);
  });

  before(async () => {

    // start the application
    require('../app');




  });

  after(async () => {
 ;
  });

  describe('Service E2E Test', () => {
    // API TEST
   require('./auth.test');
    require('./user.test');
    require('./product.test');
   // require('./scrapProduct.test');
  });
});
