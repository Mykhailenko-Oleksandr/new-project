import { handlerCategoriesList, handlerFormBtnClearValue, handlerLoadMoreBtn, handlerProductsList, handlerScroll, handlerSearchForm, hendlerThemeToggleBtn, initHomePage } from "./js/handlers";
import { auditTheme } from "./js/helpers";
import { refs } from "./js/refs";

auditTheme()
document.addEventListener('DOMContentLoaded', initHomePage);

refs.categoriesList.addEventListener('click', handlerCategoriesList);
refs.loadMoreBtn.addEventListener('click', handlerLoadMoreBtn);
refs.productsList.addEventListener('click', handlerProductsList);
refs.searchForm.addEventListener('submit', handlerSearchForm);
refs.formBtnClearValue.addEventListener('click', handlerFormBtnClearValue);
refs.themeToggleBtn.addEventListener('click', hendlerThemeToggleBtn);

window.addEventListener('scroll', handlerScroll);
