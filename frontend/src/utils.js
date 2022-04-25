import { getCartItems } from "./localStorage";

/* eslint-disable spaced-comment */
export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");

  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

//Rerender function
export const rerender = async (component) => {
  document.getElementById("main-section").innerHTML = await component.render();
  await component.after_render();
};

//Show and hide loading wrap function
export const showLoading = () => {
  document.getElementById("loading-wrap").classList.add("active");
};

export const hideLoading = () => {
  document.getElementById("loading-wrap").classList.remove("active");
};

//Message fucntion and ok button
export const showMessage = (message, callback) => {
  document.getElementById("message-wrap").innerHTML = `
  <div>
    <div id="message-wrap-content">${message}</div>
    <button id="message-wrap-close-button">OK</button>
  </div>
  `;
  document.getElementById("message-wrap").classList.add("active");
  document
    .getElementById("message-wrap-close-button")
    .addEventListener("click", () => {
      document.getElementById("message-wrap").classList.remove("active");
      if (callback) {
        callback();
      }
    });
};

export const redirectUser = () => {
  //console.log(getCartItems().length);
  if (getCartItems().length !== 0) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/';
  }
};
