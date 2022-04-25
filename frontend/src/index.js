/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-named-as-default
import Headline from "./components/Headline.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";
import CartView from "./views/CartView.js";
import Error404View from "./views/Error404View.js";
import HomeView from "./views/HomeView.js";
import PaymentView from "./views/PaymentView.js";
import ProductView from "./views/ProductView.js";
import RegisterView from "./views/RegisterView.js";
import ShippingView from "./views/ShippingView.js";
import SigninView from "./views/SigninView.js";
import SubmitOrderView from "./views/SubmitOrderView.js";
import UserView from "./views/UserView.js";

const routes = {
  "/": HomeView,
  "/product/:id": ProductView,
  "/cart/:id": CartView,
  "/cart": CartView,
  "/signin": SigninView,
  "/register": RegisterView,
  "/profile": UserView,
  "/shipping": ShippingView,
  "/payment": PaymentView,
  "/placeorder": SubmitOrderView,
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : `/`) +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const view = routes[parseUrl] ? routes[parseUrl] : Error404View;

  const header = document.getElementById("headline");
  header.innerHTML = await Headline.render();
  await Headline.after_render();

  const main = document.getElementById("main-section");
  main.innerHTML = await view.render();
  if (view.after_render) await view.after_render();
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
