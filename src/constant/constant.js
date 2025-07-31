//constants.js
// http://localhost:4000/
// https://cac-backend-i957.vercel.app/

const devUrl = "http://localhost:4000/";
export const BASE_URL = devUrl;

export const AppRoutes = {
  register: devUrl + "auth/register",
  login: devUrl + "auth/login",
  judgeLogin: devUrl + "auth/judge-login",
  logout: devUrl + "auth/logout",
  googleLogin: devUrl + "auth/google",
  contact: BASE_URL + "contact/contact",
  event: BASE_URL + "event/events",
  creategame: BASE_URL + "creategame/creategame",
  smecpost: BASE_URL + "smecpost/smecpost",
  getapplication: BASE_URL + "smecpost/application",
  category: BASE_URL + "category/categories",
  usersaccepted: BASE_URL + "category/users/accepted",
  announcements: BASE_URL + "announcement/announcements",
  judge: BASE_URL + "judge/judges",
  judgeById: (id) => BASE_URL + `judge/judges/${id}`,
  judgePanel: BASE_URL + "judge-panel",
  news: BASE_URL + "news",
  player: BASE_URL + "player",
};
