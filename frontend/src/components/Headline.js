import { getUserInfo } from "../localStorage";

const Header = {
  // eslint-disable-next-line arrow-body-style
  render: () => {
    const { name } = getUserInfo();
    return `
      <div>
          <a href="/#/">E-COMMERCE Web IT Shop!</a>
        </div>
        <div>
        ${
          name
            ? `<a href="/#/profile">${name}</a>`
            : `<a href="/#/signin">Sign In</a>`
        }
          <a href="/#/cart">Your Cart</a>
        </div>
      `;
  },
  after_render: () => {},
};

export default Header;
