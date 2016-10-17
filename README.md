# stripe-react-mockup

Uses React front-end and Express back-end to implement a simple mockup of a Stripe.js form. Ugly as hell but works somewhat...

## Installation

Initialize using `npm install`.

Get your [API keys from Stripe](https://dashboard.stripe.com/account/apikeys) and  create a file for storing them:

`touch app/config/config.global.js`

```javascript
var config = module.exports = {};

config.stripe = {
  'test_secret': 'sk_test_...',
  'test_public': 'pk_test_...',
  'live_secret': 'sk_live_...',
  'live_public': 'pk_live_...'
};
```

## Building

Simply use `npm run build`

## Running

Use `npm run server` to run both the Express server, and webpack in watch mode, to provide simple refreshing to React front-end.

## Resources

- Stripe provides [credit card numbers for testing](https://stripe.com/docs/testing#cards)
- This mockup largely based on [this tutorial](https://davidwalsh.name/step-step-guide-stripe-payments-react)
- However, you might want to consider using simple [HTML/JavaScript](https://stripe.com/docs/custom-form), or using [Flask with Checkout.js](https://gist.github.com/maccman/3299715)
