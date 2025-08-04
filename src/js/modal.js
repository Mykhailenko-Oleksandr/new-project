import { refs } from "./refs";
import { idCartArr, idWishlistArr } from "./storage";

export function modalClose() {
    refs.modal.classList.remove('modal--is-open');
}

export function modalOpen(id) {
    textWishlistBtn(id);
    textCartBtn(id);
    refs.modal.classList.add('modal--is-open');
}

function textWishlistBtn(id) {
    idWishlistArr.includes(id) ?
        refs.modalWishlistBtn.textContent = 'Remove from Wishlist' :
        refs.modalWishlistBtn.textContent = 'Add to Wishlist';
}

function textCartBtn(id) {
    idCartArr.includes(id) ?
        refs.modalCartBtn.textContent = 'Remove from Cart' :
        refs.modalCartBtn.textContent = 'Add to cart';
}

