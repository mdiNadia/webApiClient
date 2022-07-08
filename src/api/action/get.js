import swal from "sweetalert";
import api, { config, ROOT_URL } from "../api";
async function GetData({ url, id, action, dispatch }) {
  debugger;
  try {
    api.delete(`${ROOT_URL}${url}/${id}`, config).then((res) => {
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
}
export default GetData;
