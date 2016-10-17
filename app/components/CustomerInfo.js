var React = require('react');

var CustomerInfo = React.createClass({
  render: function() {
    if (this.props.status) {
      // Customer has already paid...
      return (
        <div style={{ backgroundColor: 'Aquamarine', padding: 2 }}>
          <h2>Payment completed for billing period!</h2>
          <ul>
            <li>Customer: {this.props.customerName}</li>
            <li>Billing Period: {this.props.period}</li>
            <li>Amount Charged: {this.props.amount} {this.props.currency}</li>
          </ul>
        </div>
      );
    } else {
      // Payment is still missing!
      return (
        <div style={{ backgroundColor: 'White', padding: 2 }}>
          <h2>Payment due for billing period...</h2>
          <ul>
            <li>Customer: {this.props.customerName}</li>
            <li>Billing Period: {this.props.period}</li>
            <li>Amount Due: {this.props.amount} {this.props.currency}</li>
          </ul>
        </div>
      );
    }
  }
});

module.exports = CustomerInfo;
