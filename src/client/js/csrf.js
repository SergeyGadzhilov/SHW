export function csrf(form) {
  const _control = form.querySelector('input[name="csrf"]');
  this.value = function () {
    return _control ? _control.value : "";
  };
}
