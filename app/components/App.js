var React = require('react');

var PaymentForm = require('./PaymentForm.js');
var CustomerInfo = require('./CustomerInfo.js');

// To simulate getting data from a database...
function getPaymentDataFromServer() {
  return {
    'amount': 1000, // This is the value in cents
    'currency': 'USD',
    'customerName': 'Big Spender',
    'period': '10/2016',
    'status': false // indicates payment hasn't been done yet
  };
}

var App = React.createClass({
  getInitialState: function () {
    var data = getPaymentDataFromServer();
    return {
      amount: data.amount,
      currency: data.currency,
      customerName: data.customerName,
      period: data.period,
      status: data.status
    };
  },

  changeStatus: function(newStatus) {
    this.setState({
      status: newStatus
    });
  },

  componentWillMount: function () {
    // performed before App first renders
  },

  componentDidMount: function () {
    // performed after App first renders
  },

  render: function () {
    return (
      <div>
        <h1>Stripe with React/Express</h1>
        <CustomerInfo
          amount={1.02 * this.state.amount}
          currency={this.state.currency}
          customerName={this.state.customerName}
          period={this.state.period}
          status={this.state.status} />
        <hr />
        <PaymentForm
          amount={1.02 * this.state.amount}
          currency={this.state.currency}
          customerName={this.state.customerName}
          status={this.state.status}
          changeStatus={this.changeStatus} />
      </div>
    );
  }
});

module.exports = App;
