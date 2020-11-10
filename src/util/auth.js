function isLogin(){
    return document.cookie.includes('isLogin=true');
}

function login(){
    const expireDay = 147;
    const date = new Date();
    date.setTime(date.getTime() + expireDay * 24 * 60 * 60 * 1000);
    document.cookie =  `isLogin=true;expires=${date.toUTCString()}`;
}

function cancelLogin(){
    const date = new Date();
    date.setTime(date.getTime() - 10000000);
    document.cookie =  `isLogin=true;expires=${date.toUTCString()}`;
}

export default {
    isLogin, login, cancelLogin,
}