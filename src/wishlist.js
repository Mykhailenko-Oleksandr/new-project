import { handlerProductsList, handlerScroll, hendlerThemeToggleBtn, initWishlistPage } from "./js/handlers";
import { refs } from "./js/refs";


document.addEventListener('DOMContentLoaded', initWishlistPage);
refs.productsList.addEventListener('click', handlerProductsList);
refs.themeToggleBtn.addEventListener('click', hendlerThemeToggleBtn);

window.addEventListener('scroll', handlerScroll)
