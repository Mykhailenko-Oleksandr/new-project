import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import iconError from '../img/error.svg'

export function iziToastSuccess(message) {
    return iziToast.success({
        message: message,
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '24',
        backgroundColor: '#59a10d',
        position: 'topRight',
        progressBarColor: '#b5ea7c',
        theme: 'dark',
    });
}

export function iziToastError(message) {
    return iziToast.error({
        message: message,
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '24',
        backgroundColor: '#ef4040',
        iconUrl: iconError,
        position: 'topRight',
        progressBarColor: '#b51b1b',
        theme: 'dark',
    });
}

export function iziToastInforming(message) {
    return iziToast.info({
        message: message,
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '24',
        backgroundColor: '#09f',
        position: 'topRight',
        progressBarColor: '#b8e3ff',
        theme: 'dark',
    });
}