export const isAdminAuthenticated = () => {
    if ((sessionStorage.getItem('admin') !== null)) {
        return true;
    } else {
        return false;
    }
}

export const isCookAuthenticated  = () => {
    if ((sessionStorage.getItem('cook') !== null)) {
        return true;
    } else {
        return false;
    }
}

export const isGuestAuthenticated = () => {
    if ((sessionStorage.getItem('guest') !== null) && (sessionStorage.getItem('table_id') !== null)) {
        return true;
    } else {
        return false;
    }
}