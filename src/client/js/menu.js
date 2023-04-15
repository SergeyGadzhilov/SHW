export function Menu(control) {
  let _items = control.querySelector(".menu_items");
  let _button = control.querySelector(".menu_button");

  if (_button) {
    _button.onclick = function () {
      const activeClass = "menu_items-active";
      if (_items.classList.contains(activeClass)) {
        _items.classList.remove(activeClass);
      } else {
        _items.classList.add(activeClass);
      }
    };
  }
}
