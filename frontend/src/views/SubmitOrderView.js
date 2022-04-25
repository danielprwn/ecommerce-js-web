import Checking from "../components/Checking";
import { getCartItems, getPayment, getShipping } from "../localStorage";

const convertCartOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = "/cart";
  }
  const shipping = getShipping();
  if (!shipping.address) {
    document.location.hash = "/shipping";
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = "/payment";
  }
  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.23 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

const SubmitOrderView = {
  after_render: () => {},
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartOrder();
    return `
      <div> 
      ${Checking.render({
        check1: true,
        check2: true,
        check3: true,
        check4: true,
      })}
      <div class="order">
        <div class="order-details">
        <div>
            <h2>Shipping Address</h2>
            <div>
                ${shipping.address}, ${shipping.city}, ${shipping.zipCode}
            </div>
        </div>
        <div>
            <h2>Payment</h2>
        <div>
            Payment Method ➡ ${payment.paymentMethod}
        </div>
        </div>
        <div>
          <ul class="cart-list-container">
            <li>
              <h2>Shopping Cart</h2>
              <div>Price</div>
            </li>
            ${orderItems
              .map(
                (item) => `
              <li>
                <div class="cart-image">
                  <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="cart-name">
                  <div>
                    <a href="/#/product/${item.product}">${item.name} </a>
                  </div>
                  <div> Quantity: ${item.quantity} </div>
                </div>
                <div class="cart-price"> €${item.price}</div>
              </li>
              `
              )
              .join("\n")}
          </ul>
        </div>
      </div>
      <div class="order-submit">
         <ul>
              <li>
                <h2>Summary</h2>
               </li>
               <li><div>Products price</div><div>€${itemsPrice}</div></li>
               <li><div>Shipping cost</div><div>€${shippingPrice}</div></li>
               <li><div>Input tax</div><div>€${taxPrice}</div></li>
               <li class="total"><div>Total</div><div>€${totalPrice}</div></li> 
               <li>
               <button onclick="alert('Thank you for your purchase! Your order is being processed.')" id="placeorder-button" class="primary btn">
               Sumbit Order
               </button>
            </div>
        </div>
    </div>

      `;
  },
};

export default SubmitOrderView;
