//constants.js
// http://localhost:4000/
// https://cac-backend-ibad806s-projects.vercel.app/
const devUrl = 'https://cac-backend-ibad806s-projects.vercel.app/';
export const BASE_URL = devUrl

export const AppRoutes = {
    register: devUrl + "auth/register",
    login: devUrl + "auth/login",
    logout: devUrl + "auth/logout",
    googleLogin: devUrl + "auth/google",
    contact: BASE_URL + "contact/contact",
    event: BASE_URL + "event/events",
    smecpost: BASE_URL + "smecpost/smecpost",
    getapplication: BASE_URL + "smecpost/application",
    category: BASE_URL + "category/categories",
    usersaccepted: BASE_URL + "category/users/accepted",
}