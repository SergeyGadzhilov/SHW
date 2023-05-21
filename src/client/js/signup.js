import { Server } from "./server";
import { csrf } from "./csrf";

function SignUpFormField(control) {
  let self = this;
  let _input = control.querySelector("input");

  self.value = function () {
    return _input.value;
  };

  self.validate = function () {
    if (_input.value) {
      clearError();
      return true;
    } else {
      addError();
      return false;
    }
  };

  function addError() {
    control.classList.add("registration__item-error");
  }

  function clearError() {
    control.classList.remove("registration__item-error");
  }

  self.clear = function () {
    _input.value = "";
  };
}

function SignUpFormError(control) {
  let self = this;

  self.show = function (message) {
    if (message) {
      control.innerHTML = message;
      control.classList.add("registration__error-show");
    }
  };

  self.clear = function () {
    control.innerHTML = "";
    control.classList.remove("registration__error-show");
  };
}

export function SignUpForm(control) {
  let _email = new SignUpFormField(control.querySelector("#email"));
  let _name = new SignUpFormField(control.querySelector("#name"));
  let _password = new SignUpFormField(control.querySelector("#password"));
  let _send = control.querySelector("#send_register");
  let error = new SignUpFormError(
    control.querySelector(".registration__error")
  );
  const _csrf = new csrf(control);

  if (_send) {
    _send.onclick = async function () {
      if (self.validate()) {
        const server = new Server();
        const response = await server.post("signup", {
          name: _name.value(),
          email: _email.value(),
          password: _password.value(),
          csrf: _csrf.value(),
        });

        if (response.status === "Ok") {
          error.clear();
          self.clear();
        } else {
          error.show(response.message);
        }
      }
    };
  }

  self.showError = function (message) {};

  self.validate = function () {
    return _email.validate() && _name.validate() && _password.validate();
  };

  self.clear = function () {
    _email.clear();
    _name.clear();
    _password.clear();
  };
}
