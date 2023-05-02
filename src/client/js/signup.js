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

export function SignUpForm(control) {
  let _email = new SignUpFormField(control.querySelector("#email"));
  let _name = new SignUpFormField(control.querySelector("#name"));
  let _password = new SignUpFormField(control.querySelector("#password"));
  let _send = control.querySelector("#send_register");

  if (_send) {
    _send.onclick = async function () {
      if (self.validate()) {
        console.log(`name = ${_name.value}`);
        console.log(`email = ${_email.value}`);
        console.log(`password = ${_password.value}`);
        self.clear();
      }
    };
  }

  self.validate = function () {
    return _email.validate() && _name.validate() && _password.validate();
  };

  self.clear = function () {
    _email.clear();
    _name.clear();
    _password.clear();
  };
}
