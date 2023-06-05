import { Menu } from "./js/menu";
import { SupportForm } from "./js/support";
import { SignUpForm } from "./js/signup";
import { AccountForm } from "./js/login";

let mainMenu = document.querySelector(".menu");
if (mainMenu) {
  mainMenu = new Menu(mainMenu);
}

let supportForm = document.querySelector("#support_form");
if (supportForm) {
  supportForm = new SupportForm(supportForm);
}

let signUpForm = document.querySelector("#registration__form");
if (signUpForm) {
  signUpForm = new SignUpForm(signUpForm);
}

let accountForm = document.querySelector("#account__form");
if (accountForm) {
  signUpForm = new AccountForm(accountForm);
}
