// Based on: https://davidwalsh.name/step-step-guide-stripe-payments-react

var React = require('react');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

var config = require('../config');
var STRIPE_PUBLIC_TOKEN = config.stripe.test_public;

var PaymentForm = React.createClass({
  mixins: [ ReactScriptLoaderMixin ],

  getInitialState: function() {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
      cardInfo: {}
    };
  },

  componentDidUpdate: function() {
    if (this.props.status) {
      // could handle the payment here as well??
    }
  },

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  handlePayment: function(token) {
    // send the response here
    var payload = {
      'source': token,
      'amount': this.props.amount,
      'currency': this.props.currency,
      'description': this.props.customerName
    };

    $.ajax({
      type: 'POST',
      url: '/charge',
      contentType: 'application/json',
      data: JSON.stringify(payload)
    })
  },

  onScriptLoaded: function() {
    if (!PaymentForm.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey(STRIPE_PUBLIC_TOKEN);

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  },

  onScriptError: function() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  },

  onSubmit: function(event) {
    var self = this;
    var success = false;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        success = true;
        self.setState({
          paymentComplete: true,
          submitDisabled: false,
          token: response.id,
          cardInfo: response.card
        });
        // TODO: Charge the card here using the token!
        self.props.changeStatus(true);
        self.handlePayment(response.id);
      }
    });

  },

  render: function() {
    console.log(this.state.cardInfo);
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    }
    else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    }
    else if (this.state.paymentComplete) {
      return (
        <div>
          <p>Payment Complete!</p>
          <p>Token: {this.state.token}</p>
          <p>Card Info:</p>
          <ul>
            <li>Number: {'**** '.repeat(3) + this.state.cardInfo.last4}</li>
            <li>Brand: {this.state.cardInfo.brand}</li>
            <li>Expires: {this.state.cardInfo.exp_month + '/' + this.state.cardInfo.exp_year}</li>
          </ul>
        </div>
      );
    }
    else {
      return (
        <form onSubmit={this.onSubmit} >
          <span>{ this.state.paymentError }</span><br />
          <input type='text' data-stripe='number' placeholder='credit card number' /><br />
          <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
          <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
          <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
          <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
        </form>
      );
    }
  }
});

module.exports = PaymentForm;
