/**
 * E2E test  for User.
 */
const _ = require('lodash');
let TOKEN ,EID
const {
  clearDB,
  BASE_URL, 
   handleErrors, sleep
} = require('./lib/testHelper');
const should = require('should');
const request = require('superagent');
const prefix = require('superagent-prefix')(BASE_URL);
const models = require('../src/models');


describe('ALIEXPRESS WEB SCRAPER for User E2E Test', () => {
  let newUser;
  before(async () => {
    clearDB()
    const body = {
       
        name:'test ddsaya',
        email:'test@email.com',
        password:'123456',
        company:'rjkr',
        phone:'99999999',
        avatarUrl:'http://www.zfrz.eada/'
  

    };
    const data = {
        email:'test@email.com',
        password:'123456'
    }
    newUser = await  request.post('/users')
    .use(prefix)
    .send(body)

    const login = await request.post('/login')
    .use(prefix)
    .send(data)
    TOKEN = login.body.token
    console.log('TOKEN ===',TOKEN)
  });

  after(async () => {
  });

  /*
   * Test the GET /users route
   */
  describe('GET /users', () => {
    const testbody = {
      limit:1,
      sortColumn:'email'
    };
    it('Search users with empty criteria should get succeeded', async () => {
      const res = await request.get('/users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .accept('application/json')
        .use(prefix);

      (res.status).should.equal(200);
      (res.body.totalCount).should.equal(1)

    });

    it('Search users with page criteria should get succeeded', async () => {
      const body = {
        email:newUser.email,
        limit:1,
        sortColumn:'email'
      };
      let res = await request.get('/users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .accept('application/json')
        .use(prefix)
        .query(body);
        EID = res.body.results._id;
      (res.status).should.equal(200);
      (res.body.totalCount).should.equal(1)
    });


    /*
     * Test input parameters
     */
   
     

    it('Search users with invalid field [not_exist], should return 400', async () => {
      const body = _.cloneDeep(testbody);
      body.not_exist = 'invalid';

      const res = await handleErrors(request.get('/users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .accept('application/json')
        .use(prefix)
        .query(body));

      should.equal(res.status, 400);
      (res.body.message).should.endWith('is not allowed');
    });

})

  /*
   * Test the POST /users route
   */
  describe('POST /users', () => {
    const testBody = {
      name:'test sss',
      email:'test@email2.com',
      password:'123456',
      company:'rjkr',
      phone:'99999999',
      avatarUrl:'http://www.zfrz.eada/'

  
    };

    it('Create new user should get succeeded', async () => {
      let entity;
      try {
        const body = _.cloneDeep(testBody);
        const res = await request.post('/users')
          .use(prefix)
          .send(body);

        (res.status).should.equal(200);
        entity = res.body;
    


        (entity.name).should.equal(body.name);
        (entity.email).should.equal(body.email);
        (entity.company).should.equal(body.company);
        (entity.phone).should.equal(body.phone);
        (entity.avatarUrl).should.equal(body.avatarUrl);
      

        await sleep();

        const entityDB = await models.User.findOne({ email: entity.email });
        should.exist(entityDB);
        (entity.name).should.equal(body.name);
        (entity.email).should.equal(body.email);
        (entity.company).should.equal(body.company);
        (entity.phone).should.equal(body.phone);
        (entity.avatarUrl).should.equal(body.avatarUrl);
      

      } 
      finally {
        
      }
    });

 



 

    /*
     * Test input parameters
     */
    it('Create new user with invalid field [not_exist], should return 400', async () => {
      const body = _.cloneDeep(testBody);
      body.not_exist = 'invalid';

      const res = await handleErrors(request.post('/users')
        .use(prefix)
        .send(body));

      (res.status).should.equal(400);
      (res.body.message).should.startWith('"not_exist" is not allowed');
    });



    it('Create new user with already exists [email], should return 409', async () => {
      const body = _.cloneDeep(testBody);

      const res = await handleErrors(request.post('/users')
        .use(prefix)
        .send(body));

      (res.status).should.equal(409);
      (res.body.message).should.endWith(`The email ${body.email} is already created`);
    });

  });

  /*
   * Test the GET /users/:EID route
   */
  describe('GET /users/:EID', () => {

    it('Get user without auth token should return 401', async () => {
      const res = await handleErrors(request.get(`/users/${EID}`)
        .use(prefix));

      (res.status).should.equal(401);
      (res.body.message).should.startWith('Action is not allowed for anonymous or invalid token');
    });

    /*
     * Test input parameters
     */
    it('Get user with not exist id should return 404', async () => {
      const faqId = '123456789876543213245654'
      const res = await handleErrors(request.get(`/users/${faqId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .use(prefix));

      (res.status).should.equal(404);
      (res.body.message).should.endWith(`User not found with id: ${faqId}`);
    });


  });

  

 });
