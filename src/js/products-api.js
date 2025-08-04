import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, ITEMS_PER_PAGE } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
    const results = await axios(`${API_ENDPOINTS.CATEGORIES}`);

    return results.data;
}

export async function getProducts(currentPage) {
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    const { data } = await axios(`?limit=${ITEMS_PER_PAGE}&skip=${skip}`);
    return data;
}

export async function getOneCategory(category, currentPage) {
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    const { data } = await axios(`${API_ENDPOINTS.CATEGORY}/${category}?limit=${ITEMS_PER_PAGE}&skip=${skip}`);

    return data;
}

export async function getIdProduct(id) {
    const results = await axios(`/${id}`);
    return results.data;
}

export async function getSearchProduct(search, currentPage) {
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    const data = await axios(`${API_ENDPOINTS.SEARCH}?q=${search}&limit=${ITEMS_PER_PAGE}&skip=${skip}`);
    return data.data
}
