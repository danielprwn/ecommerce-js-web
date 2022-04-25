import { update } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const UserView = {
  after_render: () => {
    document.getElementById("logout-button").addEventListener("click", () => {
      clearUser();
      document.location.hash = "/";
    });
    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = "/";
        }
      });
  },

  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    return `
    <div class="form-section">
      <form id="profile-form">
        <ul class="form-elements">
          <li>
            <h1>Your profile</h1>
          </li>
          <li>
            <label for="name">Name</label>
            <input type="name" name="name" id="name" value="${name}"/>
          </li>
          <li>
            <label for="email">Adress E-mail</label>
            <input type="email" name="email" id="email" value="${email}"/>
          </li>
          <li>
            <label for="password">Your Password</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary btn">Update profile</button>
          </li>
          <li>
            <button type="button" id="logout-button" class="logout-btn">Logout</button>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};

export default UserView;
