import Checking from "../components/Checking";
import { getUserInfo, getShipping, setShipping } from "../localStorage";

const ShippingView = {
  after_render: () => {
    document
      .getElementById("shipping-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        setShipping({
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          zipCode: document.getElementById("zipCode").value,
        });
        document.location.hash = "/payment";
      });
  },

  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    const { address, city, zipCode } = getShipping();
    return `
    ${Checking.render({ check1: true, check2: true })}
    <div class="form-section">
      <form id="shipping-form">
        <ul class="form-elements">
          <li>
            <h1>Shipping</h1>
          </li>
          <li>
            <label for="address">Address</label>
            <input type="text" name="address" id="address" value="${address}"/>
          </li>
          <li>
            <label for="city">City</label>
            <input type="text" name="city" id="city" value="${city}"/>
          </li>
          <li>
            <label for="zipCode">ZIP code</label>
            <input type="text" name="zipCode" id="zipCode" value="${zipCode}"/>
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

export default ShippingView;
