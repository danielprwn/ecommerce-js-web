import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const SigninView = {
  after_render: () => {
    document
      .getElementById("signin-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await signin({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          redirectUser();
        }
      });
  },

  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
    <div class="form-section">
      <form id="signin-form">
        <ul class="form-elements">
          <li>
            <h1>SignIn Here!</h1>
          </li>
          <li>
            <label for="email">Adress E-mail</label>
            <input type="email" name="email" id="email" />
          </li>
          <li>
            <label for="password">Your Password</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary btn">SignIn</button>
          </li>
          <li>
            <div>
              You are new user?
              <a href="/#/register">Create your account here (click).</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};

export default SigninView;
