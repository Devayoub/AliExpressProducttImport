/**
 * The configuration file.
 */

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PORT: process.env.PORT || 3003,
  // it is configured to be empty at present, but may add prefix like '/api/v1'
  API_PREFIX: process.env.API_PREFIX || '',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/sss',
  PASSWORD_HASH_SALT_LENGTH: process.env.PASSWORD_HASH_SALT_LENGTH || 10,
  JWT_SECRET: process.env.JWT_SECRET || 'hjijfvbw859',
  // a string of time span, see https://github.com/zeit/ms
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION || '100 days',
  // a string of time span, see https://github.com/zeit/ms
  FORGOT_PASSWORD_TOKEN_EXPIRATION: process.env.FORGOT_PASSWORD_TOKEN_EXPIRATION || '10 days',


  DEFAULT_USER_INPUT_NAME: process.env.DEFAULT_USER_INPUT_NAME || 'User input',

  FROM_EMAIL: process.env.FROM_EMAIL || 'test@test.com',
  EMAIL: {
    // Heroku SendGrid SMTP host is 'smtp.sendgrid.net', port is 587
    host: process.env.SMTP_HOST || (process.env.SENDGRID_USERNAME ? 'smtp.sendgrid.net' : 'localhost'),
    port: process.env.SMTP_PORT || (process.env.SENDGRID_USERNAME ? 587 : 2525),
    auth: {
      user: process.env.SMTP_USER || process.env.SENDGRID_USERNAME || 'user',
      pass: process.env.SMTP_PASSWORD || process.env.SENDGRID_PASSWORD || 'password'
    }
  }
}
