export const ACTION_TYPE_LOGIN = "ACTION_TYPE_LOGIN";
export const ACTION_TYPE_LOGOUT = "ACTION_TYPE_LOGOUT";

export const _USER_LOGIN = (user) => {
  return {
    type: ACTION_TYPE_LOGIN,
    payload: user,
  };
};
export const _USER_LOGOUT = () => {
  return {
    type: ACTION_TYPE_LOGOUT,
  };
};
