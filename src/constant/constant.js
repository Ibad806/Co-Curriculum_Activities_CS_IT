//constants.js
const devUrl = 'http://localhost:4000/';
export const BASE_URL = devUrl

export const AppRoutes = {
    register: devUrl + "auth/register",
    login: devUrl + "auth/login",
    logout: devUrl + "auth/logout",
    googleLogin: devUrl + "auth/google",
}