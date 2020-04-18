/**
 * ScrapProductRoute
 */

module.exports = {
 '/scrapProduct/:id':{
     post : {method:'scrapProduct',controller:'ScrapProductController',auth : true}
 },
 '/products':{
    get : {method:'getAll',controller:'ProductController',auth : true},
    post : {method:'createProduct',controller:'ProductController',auth : true}
},
'/product/:id':{
    get : {method:'getProduct',controller:'ProductController',auth : true},
    put : {method:'updateProduct',controller:'ProductController',auth : true},
    delete : {method:'deleteProduct',controller:'ProductController',auth : true}
    
},

'/login': {
    post: { controller: 'SecurityController', method: 'login',auth : false }
  },
  '/forgotPassword': {
    get: { controller: 'SecurityController', method: 'forgotPassword', auth : false}
  },
  '/changeForgotPassword': {
    get: { controller: 'SecurityController', method: 'changeForgotPassword', auth : false}
  },
  '/resetPassword': {
    post: { controller: 'SecurityController', method: 'resetPassword',auth : false  }
  },

  '/users': {
    get: {
      controller: 'UserController',
      method: 'searchUsers',
      auth : true
    },
    post: {
      controller: 'UserController',
      method: 'createUser',
      auth : false
    }
  },
  '/users/:userId': {
    get: { controller: 'UserController', method: 'getUser' , auth : true},
    put: {
      controller: 'UserController',
      method: 'updateUser',
      auth : true
    }
  },


}