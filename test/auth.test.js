/**
 * E2E test For Auth
 */
const should = require('should');
const {
    clearDB,
    BASE_URL, 
     handleErrors, sleep
  } = require('./lib/testHelper');
const request = require('superagent');
const prefix = require('superagent-prefix')(BASE_URL);
/**
 * test Api
 */
describe('ALIEXPRESS WEB SCRAPER for Authentification',()=>{

    it('Login with correct credentials should get succeeded',async ()=>{
        const body = {
            email: 'test@email.com',
            password: '123456'
          };

    const res = await request.post('/login')
            .use(prefix)
            .accept('application/json')
            .send(body);
    (res.status).should.equal(200);

}),
it('Login with inncorrect credentials should get 401',async ()=>{
    const body = {
        email: 'wrong@email.com',
        password: '123456'
      };

      const res = await handleErrors(request.post('/login')
            .use(prefix)
             .send(body));

        (res.status).should.equal(401);
        await sleep();
})
/**
 * test input
 */

it('Login with  invalid field [not_exist], should return 401',async ()=>{
    const body = {
        field: 'wrong@email.com',
        password: '123456'
      };
      const res = await handleErrors(request.post('/login')
             .use(prefix)
             .send(body));

        (res.status).should.equal(400);

})

})

