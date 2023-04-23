import { Server } from "./server";

export function SupportForm() {
  const self = this;
  let _control = document.querySelector("#support_form");
  let _name = _control.querySelector("#name");
  let _email = _control.querySelector("#email");
  let _message = _control.querySelector("#message");
  let _send = _control.querySelector("#support_form_send");

  if (_send) {
    _send.onclick = async function () {
      const server = new Server();
      await server.post("support/ticket", {
        name: _name.value,
        email: _email.value,
        message: _message.value,
      });
      self.clear();
    };
  }

  self.clear = function () {
    _name.value = "";
    _email.value = "";
    _message.value = "";
  };
}
