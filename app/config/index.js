var env = process.env.NODE_ENV || 'development';
var config = require('./config.global');

// Set your Stripe API keys (https://dashboard.stripe.com/account/apikeys)
// in config.global.js...
//
// config.stripe = {
//   'test_secret': 'sk_test...',
//   'test_public': 'pk_test...',
//   'live_secret': 'sk_live...',
//   'live_public': 'pk_live...'
// };

module.exports = config;
