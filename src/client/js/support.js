import { Server } from "./server";

function FormField(control) {
  const self = this;
  let _field = control;
  let _control = _field.querySelector(".support_form__control");

  self.value = function () {
    return _control.value;
  };

  self.validate = function () {
    if (_control.value) {
      clearError();
      return true;
    } else {
      addError();
      return false;
    }
  };

  function addError() {
    _field.classList.add("support_form__item-error");
    _control.classList.add("support_form__control-error");
  }

  function clearError() {
    _field.classList.remove("support_form__item-error");
    _control.classList.remove("support_form__control-error");
  }

  self.clear = function () {
    _control.value = "";
    clearError();
  };
}

export function SupportForm() {
  const self = this;
  let _control = document.querySelector("#support_form");
  let _name = new FormField(_control.querySelector("#support_form_name"));
  let _email = new FormField(_control.querySelector("#support_form_email"));
  let _message = new FormField(_control.querySelector("#support_form_message"));
  let _send = _control.querySelector("#support_form_send");

  if (_send) {
    _send.onclick = async function () {
      if (self.validate()) {
        const server = new Server();
        await server.post("support/ticket", {
          name: _name.value(),
          email: _email.value(),
          message: _message.value(),
        });
        self.clear();
      }
    };
  }

  self.validate = function () {
    return _name.validate() && _email.validate() && _message.validate();
  };

  self.clear = function () {
    _name.clear();
    _email.clear();
    _message.clear();
  };
}
