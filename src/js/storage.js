import { initCartPage, initWishlistPage, isCartPage, isWishlistPage } from "./handlers";
import { refs } from "./refs";
import { clearProducts } from "./render-function";

export const idWishlistArr = JSON.parse(localStorage.getItem('wishlist')) || [];
export const idCartArr = JSON.parse(localStorage.getItem('cart')) || [];

export function setStorageWishlist(id) {
    if (idWishlistArr.includes(id)) {
        const index = idWishlistArr.indexOf(id);
        idWishlistArr.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(idWishlistArr));
        refs.modalWishlistBtn.textContent = 'Add to Wishlist';

        refs.navCountWishlist.textContent = idWishlistArr.length;

        if (isWishlistPage) {
            clearProducts();
            initWishlistPage();
        }
        return;
    }

    idWishlistArr.push(id);
    refs.modalWishlistBtn.textContent = 'Remove from Wishlist';

    refs.navCountWishlist.textContent = idWishlistArr.length;

    localStorage.setItem('wishlist', JSON.stringify(idWishlistArr));

    if (isWishlistPage) {
        clearProducts();
        initWishlistPage();
    }
}

export function setStorageCart(id) {
    if (idCartArr.includes(id)) {
        const index = idCartArr.indexOf(id);
        idCartArr.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(idCartArr));
        refs.modalCartBtn.textContent = 'Add to cart';

        refs.navCountCart.textContent = idCartArr.length;

        if (isCartPage) {
            clearProducts();
            initCartPage();
        }
        return;
    }

    idCartArr.push(id);
    refs.modalCartBtn.textContent = 'Remove from Cart';

    refs.navCountCart.textContent = idCartArr.length;

    localStorage.setItem('cart', JSON.stringify(idCartArr));

    if (isCartPage) {
        clearProducts();
        initCartPage();
    }
}

export function setStorageTheme(action) {

    if (action === 'add') {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.removeItem('theme');
    }
}
