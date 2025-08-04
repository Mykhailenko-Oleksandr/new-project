import { auditTheme, hideLoader, lastPageInforming, loadMoreBtnIsHidden, loadMoreBtnIsVisible, removeClassCategory, scrollByTop, showLoader } from "./helpers";
import { iziToastError, iziToastSuccess } from "./izi-toast";
import { modalClose, modalOpen, } from "./modal";
import { getCategories, getIdProduct, getOneCategory, getProducts, getSearchProduct } from "./products-api";
import { refs } from "./refs";
import { clearProducts, renderCategories, renderModalProduct, renderProducts } from "./render-function";
import { idCartArr, idWishlistArr, setStorageCart, setStorageTheme, setStorageWishlist } from "./storage";

let currentPage = 1;
let textCategory = 'all';
let isSearch = false;
let searchValue = null;
let idProduct = null;
export let isWishlistPage = false;
export let isCartPage = false;
let isTopPage = true;

export async function initHomePage() {
    isWishlistPage = false;
    isCartPage = false;

    auditTheme();
    showLoader();
    refs.navCountWishlist.textContent = idWishlistArr.length;
    refs.navCountCart.textContent = idCartArr.length;

    try {
        const categories = ['all', ...await getCategories()];
        renderCategories(categories);
    } catch (error) {
        iziToastError(error.message);
    }

    try {
        const { products, total } = await getProducts(currentPage);
        renderProducts(products);

        if (total > 12) {
            loadMoreBtnIsVisible();
        }
    } catch (error) {
        iziToastError(error.message);
    }


    hideLoader();
}

export async function initWishlistPage() {
    isWishlistPage = true;
    isCartPage = false;

    auditTheme();
    showLoader();
    refs.divNotFound.classList.remove('not-found--visible');
    refs.navCountWishlist.textContent = idWishlistArr.length;
    refs.navCountCart.textContent = idCartArr.length;

    try {
        const fetchWishlist = idWishlistArr.map(async id => {
            return await getIdProduct(id);
        })
        await Promise.all(fetchWishlist)
            .then(products => {
                renderProducts(products);

                if (products.length === 0) {
                    refs.divNotFound.classList.add('not-found--visible');
                    return;
                }
            })
            .catch(error => iziToastError(error.message))
    } catch (error) {
        iziToastError(error.message);
    } finally {
        hideLoader();
    }

}

export async function initCartPage() {
    isWishlistPage = false;
    isCartPage = true;

    auditTheme();
    showLoader();
    refs.divNotFound.classList.remove('not-found--visible');
    refs.navCountWishlist.textContent = idWishlistArr.length;
    refs.navCountCart.textContent = idCartArr.length;
    refs.sidebarCountCart.textContent = idCartArr.length;

    try {
        const fetchCart = idCartArr.map(async id => {
            return await getIdProduct(id);
        })
        await Promise.all(fetchCart)
            .then(products => {
                renderProducts(products);

                const totalCents = products.reduce((acc, product) => acc + Math.round(product.price * 100), 0)
                const totalPrice = totalCents / 100;
                refs.sidebarPriceCart.textContent = `$ ${totalPrice}`;

                if (products.length === 0) {
                    refs.divNotFound.classList.add('not-found--visible');
                    return;
                }
            })
            .catch(error => { iziToastError(error.message); })
    } catch (error) {
        iziToastError(error.message);
    } finally {
        hideLoader();
    }
}

export async function handlerCategoriesList(event) {
    currentPage = 1;
    isSearch = false;
    if (event.target.tagName !== "BUTTON") {
        return;
    }

    clearProducts();
    loadMoreBtnIsHidden();
    refs.divNotFound.classList.remove('not-found--visible');
    removeClassCategory('categories__btn--active');
    event.target.classList.add('categories__btn--active');
    showLoader();

    textCategory = event.target.textContent;

    if (textCategory === 'all') {
        try {
            const { products, total } = await getProducts(currentPage);
            renderProducts(products);
            if (total > 12) {
                loadMoreBtnIsVisible();
            }
        } catch (error) {
            iziToastError(error.message);
        } finally {
            hideLoader();
        }
        return;
    }

    try {
        const { products, total } = await getOneCategory(textCategory, currentPage);

        if (total === 0) {
            refs.divNotFound.classList.add('not-found--visible');
            return;
        }
        renderProducts(products);
        if (total > 12) {
            loadMoreBtnIsVisible();
        }
    } catch (error) {
        iziToastError(error.message);
    } finally {
        hideLoader();
    }
}

export async function handlerLoadMoreBtn() {
    showLoader();
    currentPage++;
    loadMoreBtnIsHidden();
    if (textCategory === 'all') {
        try {
            const { products, total } = await getProducts(currentPage);
            renderProducts(products);
            if (total > 12 * currentPage) {
                loadMoreBtnIsVisible();
            }

            lastPageInforming(total, currentPage);
        } catch (error) {
            iziToastError(error.message);
        } finally {
            hideLoader();
        }
        return;
    }
    if (isSearch) {
        try {
            const { products, total } = await getSearchProduct(searchValue, currentPage);
            renderProducts(products);
            if (total > 12 * currentPage) {
                loadMoreBtnIsVisible();
            }

            lastPageInforming(total, currentPage);
        } catch (error) {
            iziToastError(error.message);
        } finally {
            hideLoader();
        }
        return;
    }
    try {
        const { products, total } = await getOneCategory(textCategory, currentPage);
        renderProducts(products);
        if (total > 12 * currentPage) {
            loadMoreBtnIsVisible();
        }

        lastPageInforming(total, currentPage);
    } catch (error) {
        iziToastError(error.message);
    } finally {
        hideLoader();
    }
}

export async function handlerProductsList(event) {
    if (!event.target.closest('.products__item')) {
        return;
    }
    showLoader()
    idProduct = event.target.closest('.products__item').dataset.id;

    try {
        const product = await getIdProduct(idProduct);

        renderModalProduct(product);
        modalOpen(idProduct);


        const modalBuyBtn = document.querySelector('.modal-product__buy-btn');

        modalBuyBtn.addEventListener('click', handlerBuyProductsBtn);
        refs.modalCloseBtn.addEventListener('click', modalClose);
        refs.modalWishlistBtn.addEventListener('click', onModalWishlistBtnClick);
        refs.modalCartBtn.addEventListener('click', onModalCartBtnClick);
    } catch (error) {
        iziToastError(error.message);
    } finally {
        hideLoader()
    }
}

export async function handlerSearchForm(event) {
    event.preventDefault();

    searchValue = event.target.elements.searchValue.value.trim().toLowerCase();
    textCategory = searchValue;
    if (!searchValue) {
        iziToastError("You didn't enter anything in the search field")
        return;
    }

    currentPage = 1;
    clearProducts();
    loadMoreBtnIsHidden();
    refs.divNotFound.classList.remove('not-found--visible');
    showLoader();

    try {
        const { products, total } = await getSearchProduct(searchValue, currentPage);
        if (total === 0) {
            refs.divNotFound.classList.add('not-found--visible');
            return;
        }
        renderProducts(products);
        if (total > 12) {
            isSearch = true;
            loadMoreBtnIsVisible();
        }

    } catch (error) {
        iziToastError(error.message);
    } finally {
        hideLoader();
    }
}

export async function handlerFormBtnClearValue() {
    refs.searchForm.elements.searchValue.value = '';
    clearProducts();
    loadMoreBtnIsHidden();
    showLoader();
    try {
        const { products, total } = await getProducts(currentPage);
        renderProducts(products);
        if (total > 12) {
            loadMoreBtnIsVisible();
        }
    } catch (error) {
        iziToastError(error.message);
    } finally {
        hideLoader();
    }
}

function onModalWishlistBtnClick() {
    setStorageWishlist(idProduct);
}

function onModalCartBtnClick() {
    setStorageCart(idProduct);
}

export function handlerBuyProductsBtn() {
    iziToastSuccess('You have successfully made a purchase')
}

export function handlerScroll() {

    if (window.scrollY > 400 && isTopPage === true) {
        isTopPage = false;
        refs.scrollTopBtn.classList.add('scroll-top-btn--visible');
        refs.scrollTopBtn.addEventListener('click', scrollByTop);

    } else if (window.scrollY < 400 && isTopPage === false) {
        isTopPage = true;
        refs.scrollTopBtn.removeEventListener('click', scrollByTop);
        refs.scrollTopBtn.classList.remove('scroll-top-btn--visible');
    }
}

export function hendlerThemeToggleBtn() {
    const themeStorage = localStorage.getItem('theme') || '';

    if (themeStorage === '') {
        setStorageTheme('add');
        refs.body.classList.add('dark-theme');
    } else {
        setStorageTheme('remove');
        refs.body.classList.remove('dark-theme');
    }
}
