import swal from "sweetalert";
import api, { config, ROOT_URL } from "../api";

async function PostData({ url, form, action, dispatch, goBack, setErrors }) {
  try {
    debugger;
    await api.post(`${ROOT_URL}${url}`, form, config).then((res) => {
      if (res.status === 200) {
        swal("با موفقیت اضافه شد", {
          icon: "success",
        }).then(() => {
          dispatch(action(res.data));
          goBack();
        });
      } else {
        swal("خطایی پیش آمد!", {
          icon: "error",
        });
      }
    });
  } catch (err) {
    // console.log(err.response.status);
    console.log(err.response.data.errors);
    if (err.response.status === 400) {
      swal(`اطلاعات ضروری را تکمیل نمایید!`, {
        icon: "error",
      });
      setErrors(err.response.data.errors);
    } else {
      swal(`${err}!`, {
        icon: "error",
      });
      setErrors(err.response.data.errors);
    }
  }
}
export default PostData;
