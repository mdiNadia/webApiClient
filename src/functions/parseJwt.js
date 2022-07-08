export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export const parseJwtExpTime = (token) => {
  var res = parseJwt(token);
  try {
    return res.exp < Date.now() / 1000;
  } catch (e) {
    return null;
  }
};
