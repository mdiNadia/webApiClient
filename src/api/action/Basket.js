import swal from "sweetalert";
import api, { config, ROOT_URL } from "../api";
async function BasketItems({
  url,
  action,
  dispatch,
  setLoading,
}) {
  debugger
  try {
    await api
      .get(
        `${ROOT_URL}${url}`,config)
      .then((res) => {
        if (res.status === 200) {
          dispatch(action(res.data));
        } else {
          swal("خطایی پیش آمد!", {
            icon: "error",
          });
        }
      });
  } catch (err) {
    swal(`${err}!`, {
      icon: "error",
    });
  }
  setTimeout(() => {
    setLoading && setLoading(false);
  }, 1000);
}
export default BasketItems;
