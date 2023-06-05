import { Server } from "./server";
import { csrf } from "./csrf";

function AccountFormField(control) {
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

function AccountFormError(control) {
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

export function AccountForm(control) {
  let _email = new AccountFormField(control.querySelector("#email"));
  let _password = new AccountFormField(control.querySelector("#password"));
  let _send = control.querySelector("#send");
  let error = new AccountFormError(
    control.querySelector(".registration__error")
  );
  const _csrf = new csrf(control);

  if (_send) {
    _send.onclick = async function () {
      if (self.validate()) {
        const server = new Server();
        const response = await server.post("login", {
          email: _email.value(),
          password: _password.value(),
          csrf: _csrf.value(),
        });

        if (response.status === "OK") {
          error.clear();
          self.clear();
          document.location.href = "/";
        } else {
          error.show(response.message);
        }
      }
    };
  }

  self.validate = function () {
    return _email.validate() && _password.validate();
  };

  self.clear = function () {
    _email.clear();
    _password.clear();
  };
}
