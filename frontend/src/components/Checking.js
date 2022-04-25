/* eslint-disable arrow-body-style */

const Checking = {
  render: (props) => {
    return `
      <div class="checking">
        <div class="${props.check1 ? "active" : ""}">Sign In</div>
        <div class="${props.check2 ? "active" : ""}">Shipping</div>
        <div class="${props.check3 ? "active" : ""}">Payment</div>
        <div class="${props.check4 ? "active" : ""}">Submit your order</div>
      </div>
      `;
  },
};

export default Checking;
