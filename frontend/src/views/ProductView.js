import { getProduct } from "../api";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";
import StarRating from "../components/StarRating";

const ProductView = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },

  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();

    return `
    <div class="content">
      <div class="back-homepage">
        <a href="/#/">🔙 Back To Home Page</a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-description">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
            ${StarRating.render({
              value: product.rating,
            })}
            </li>
            <li>
              Price: <strong>€${product.price}</strong>
            </li>
            <li>
              Description:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
            <ul>
              <li>
                Price: €${product.price}
              </li>
              <li>
              Availability: 
                  ${
                    product.availability > 0
                      ? `<span class="success">Available</span>`
                      : `<span class="error">Unavailable</span>`
                  }
              </li>
              <li>
                  <button id="add-button" class="btn primary">Add to Cart!</div>
            </ul>
        </div>
      </div>
    </div>`;
  },
};

export default ProductView;
