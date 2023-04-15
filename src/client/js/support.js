export function SupportForm() {
  let _control = document.querySelector("#support_form");
  let _name = _control.querySelector("#name");
  let _email = _control.querySelector("#email");
  let _message = _control.querySelector("#message");
  let _send = _control.querySelector("#support_form_send");

  if (_send) {
    _send.onclick = function () {
      let message = {
        name: _name.value,
        email: _email.value,
        message: _message.value,
      };
      console.log(message);
    };
  }
}
