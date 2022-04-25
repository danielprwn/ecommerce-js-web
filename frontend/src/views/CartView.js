import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    // eslint-disable-next-line no-use-before-define
    rerender(CartView);
  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart";
  } else {
    // eslint-disable-next-line no-use-before-define
    rerender(CartView);
  }
};

const CartView = {
  after_render: () => {
    const quantitySelects = document.getElementsByClassName("quantity-select");
    Array.from(quantitySelects).forEach((quantitySelect) => {
      quantitySelect.addEventListener("change", (e) => {
        const item = getCartItems().find(
          (x) => x.product === quantitySelect.id
        );
        addToCart({ ...item, quantity: Number(e.target.value) }, true);
      });
    });

    const deleteButtons = document.getElementsByClassName("delete-btn");
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        removeFromCart(deleteButton.id);
      });
    });

    document.getElementById("checkout-button").addEventListener("click", () => {
      document.location.hash = "/signin";
    });
  },

  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        availability: product.availability,
        quantity: 1,
      });
    }

    const cartItems = getCartItems();
    return `
    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
        <li>
          <h2>Your Cart</h2>
          <div>Price</div>
        </li>
        ${
          cartItems.length === 0
            ? '<div>Cart is empty. <a href="/#/">Go to home page</a>'
            : cartItems
                .map(
                  (item) => `
        <li>
          <div class="cart-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="cart-name">
            <div>
              <a href="/#/product/${item.product}">
                ${item.name}
              </a>
            </div>
          <div>
          Quantity: 
              <select class="quantity-select" id="${item.product}">
                ${[...Array(item.availability).keys()].map((x) =>
                  item.quantity === x + 1
                    ? `<option selected value="${x + 1}">${x + 1}</option>`
                    : `<option  value="${x + 1}">${x + 1}</option>`
                )}  
              </select>
              <button type="button" class="delete-btn" id="${
                item.product
              }">Delete</button>
            </div>
          </div>
          <div class="cart-price">
            €${item.price}
          </div>
          </li>
          `
                )
                .join("\n")
        }
      </ul>
    </div>
    <div class="cart-action">
      <h3>
        Subtotal (${cartItems.reduce((a, c) => a + c.quantity, 0)} items):
        €${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
      </h3>
      <button id="checkout-button" class="primary btn">Checkout</button>
    </div>
  </div>
  `;
  },
};

export default CartView;
