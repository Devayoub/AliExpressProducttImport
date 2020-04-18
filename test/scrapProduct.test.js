/**
 * E2E test For Product
 */
const should = require('should');
let TOKEN ,EID,product,ProductId
const {
    clearDB,
    BASE_URL, 
     handleErrors, sleep
  } = require('./lib/testHelper');
const request = require('superagent');
const prefix = require('superagent-prefix')(BASE_URL);


  describe('ALIEXPRESS WEB SCRAPER for Product E2E Test', () => {
    
    before(async () => {
      clearDB();
      ProductId = '4000065033427'
      const userdata = {
         
          name:'test daya',
          email:'test@email.com',
          password:'123456',
          company:'rjkr',
          phone:'99999999',
          avatarUrl:'http://www.zfrz.eada/'
    
  
      };
  
    const  newUser = await  request.post('/users')
      .use(prefix)
      .send(userdata);
      const data = {
        email:'test@email.com',
        password:'123456'
    };

    const login = await request.post('/login')
    .use(prefix)
    .send(data);

      TOKEN = login.body.token;
      EID = newUser.body._id;


    });
  
    after(async () => {
    });
  
    /*
     * Test the GET /users route
     */

/**
 * test Add Product in /product/:id Api
 */
describe('POST /scrapProduct/:id',()=>{
    it('Scrape and Add Product should get succeeded',async ()=>{
       

    const res = await request.post(`/scrapProduct/${ProductId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
            await sleep();

    (res.status).should.equal(200);
    product = res.body
    product.user = EID
    
}).timeout(30000);



})
})