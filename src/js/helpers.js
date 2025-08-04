import { iziToastInforming } from "./izi-toast";
import { refs } from "./refs";

export function removeClassCategory(className) {
    const allBtn = document.querySelectorAll('.categories__btn');

    Array.from(allBtn).forEach(item => {
        item.classList.remove(`${className}`)
    });
}

export function loadMoreBtnIsVisible() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}

export function loadMoreBtnIsHidden() {
    refs.loadMoreBtn.classList.add('is-hidden');
}

export function lastPageInforming(total, currentPage) {
    if (total <= 12 * currentPage) {
        iziToastInforming("Last page");
    }
}

export function showLoader() {
    refs.loader.classList.add('is-visible');
}

export function hideLoader() {
    refs.loader.classList.remove('is-visible');
}

export function scrollByTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function auditTheme() {
    const themeStorage = localStorage.getItem('theme') || '';

    if (themeStorage === '') {
        return;
    } else {
        refs.body.classList.add('dark-theme');
    }
}