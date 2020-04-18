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
       product = {
        title :'Product Title',
        description :'Product Description',
        imageList :['zfzrfzrfzrf','zrfrzfzrf','fzfzrf'],
        sku : ['rfzrfzrf','rfzrfzrf','srfrzfzr'],
        user : EID
      }; 

    });
  
    after(async () => {
    });
  
    /*
     * Test the GET /users route
     */

/**
 * test Add Product in /product/:id Api
 */
describe('POST /products',()=>{

    it('Add Product should get succeeded',async ()=>{
       

    const res = await request.post('/products')
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json')
            .send(product);
    (res.status).should.equal(200);
    ProductId = res.body.id
})

/**
 * test Get Products in /products Api
 */
describe('GET /products',()=>{

    it('Get all Products  should get succeeded',async ()=>{
       

    const res = await request.get('/products')
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
          
    (res.status).should.equal(200);

    })
})

/**
 * test Get One Product in /products Api
 */
describe('GET /products/:id',()=>{

    it('Get one Product by a correct ID  should get succeeded',async ()=>{
       

    const res = await request.get(`/product/${ProductId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
          
    (res.status).should.equal(200);

    })
})

/**
 * test Update One Product in /products Api
 */
describe('PUT /products/:id',()=>{

    it('Modify one Product by a correct ID  should get succeeded',async ()=>{
       
        product.title = 'changed Title'
    const res = await request.put(`/product/${ProductId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .send(product)
            .accept('application/json');
          
    (res.status).should.equal(200);

    })
})

/**
 * test delete One Product in /products Api
 */
describe('PUT /products/:id',()=>{

    it('DELETE one Product by a correct ID  should get succeeded',async ()=>{
       
    const res = await request.delete(`/product/${ProductId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
          
    (res.status).should.equal(200);

    })
})
})
})