export const _Toggle_Handle = "_Toggle_Handle";
const screenWidth = window.innerWidth;

export const _Get_Toggle_Handle_Value = (isClosed) => {
  return {
    type: _Toggle_Handle,
    payload: isClosed,
  };
};
