import { Http } from "../web_modules/@kwasniew/hyperapp-fx.js";
import { preventDefault } from "../shared/lib/events.js";
import { LOGIN, REGISTER } from "../shared/pages.js";
import { API_ROOT } from "../config.js";
import { html } from "../shared/html.js";
import { targetValue } from "../shared/lib/events.js";
import { errorsList } from "../shared/selectors.js";
import { ListErrors } from "../shared/ListErrors.js";
import { UserError, UserSuccess } from "../shared/user/index.js";

export const ChangeUsername = (state, username) => ({ ...state, username });
export const ChangeEmail = (state, email) => ({ ...state, email });
export const ChangePassword = (state, password) => ({ ...state, password });

const Login = ({ email, password }) =>
  Http({
    url: API_ROOT + "/users/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: { email, password } })
    },
    errorResponse: "json",
    action: UserSuccess,
    error: UserError
  });
export const SubmitLogin = state => [
  { ...state, inProgress: true },
  [preventDefault, Login({ email: state.email, password: state.password })]
];

const Register = ({ email, password, username }) =>
  Http({
    url: API_ROOT + "/users",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: { email, password, username } })
    },
    errorResponse: "json",
    action: UserSuccess,
    error: UserError
  });
export const SubmitRegister = state => [
  { ...state, inProgess: true },
  [
    preventDefault,
    Register({
      email: state.email,
      password: state.password,
      username: state.username
    })
  ]
];

const defaultAuthFields = {
  email: "",
  password: "",
  inProgress: false,
  errors: {}
};

export const LoadLoginPage = page => state => {
  return {
    page,
    user: state.user,
    ...defaultAuthFields
  };
};

export const LoadRegisterPage = page => state => {
  return {
    page,
    ...defaultAuthFields,
    user: state.user,
    username: ""
  };
};

export const LoginPage = ({ email, password, inProgress, errors }) => html`
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <a href=${REGISTER}>Need an account?</a>
          </p>

          ${ListErrors({ errors: errorsList({ errors }) })}

          <form onsubmit=${SubmitLogin}>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  value=${email}
                  oninput=${[ChangeEmail, targetValue]}
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value=${password}
                  oninput=${[ChangePassword, targetValue]}
                />
              </fieldset>

              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled=${inProgress}
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
`;

export const RegisterPage = ({
  username,
  password,
  email,
  inProgress,
  errors
}) => html`
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <a href=${LOGIN}>Have an account?</a>
          </p>

          ${ListErrors({ errors: errorsList({ errors }) })}

          <form onsubmit=${SubmitRegister}>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  value=${username}
                  oninput=${[ChangeUsername, targetValue]}
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  value=${email}
                  oninput=${[ChangeEmail, targetValue]}
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value=${password}
                  oninput=${[ChangePassword, targetValue]}
                />
              </fieldset>

              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled=${inProgress}
              >
                Sign up
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
`;