import Checking from "../components/Checking";
import { getUserInfo, setPayment } from "../localStorage";

const PaymentView = {
  after_render: () => {
    document
      .getElementById("payment-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector(
          'input[name="payment-method"]:checked'
        ).value;
        setPayment({ paymentMethod });
        document.location.hash = "/placeorder";
      });
  },

  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }

    return `
    ${Checking.render({ check1: true, check2: true, check3: true })}
    <div class="form-section">
      <form id="payment-form">
        <ul class="form-elements">
          <li>
            <h1>Payment</h1>
          </li>
          <li>
            <div>
              <input type="radio"
              name="payment-method"
              id="paypal"
              value="Paypal"
              checked/>
              <label for="paypal" >PayPal method</label>
            </div>
          </li>

          <li>
            <div>
              <input type="radio"
              name="payment-method"
              id="card"
              value="Card" />
              <label for="card" >Card method</label>
            </div>
          </li>

          <li>
            <div>
              <input type="radio"
              name="payment-method"
              id="blik"
              value="Blik" />
              <label for="blik">Blik method</label>
            </div>
          </li>
          <li>
            <button type="submit" class="primary btn">Next</button>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};

export default PaymentView;
