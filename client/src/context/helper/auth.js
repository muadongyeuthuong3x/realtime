  
import { setCookie, getCookie, deleteCookie } from './cookies';
import {
    setLocalStorage,
    getLocalStorage,
    deleteLocalStorage,
} from './localStorage';

export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
};

export const tokenget = () => {
    if (getCookie('token') ) {
        return getCookie('token');
    } else {
        return false;
    }
};

export const logout = (next) => {
    deleteCookie('token');
    deleteLocalStorage('user');

    next();
};