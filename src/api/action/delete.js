import swal from "sweetalert";
import api, { config, ROOT_URL } from "../api";
async function DeleteData({ url, id, action, dispatch }) {
  debugger;
  try {
    swal({
      title: "آیا مطمئن هستید؟",
      text: "عملیات حذف غیر قابل بازگشت می‌باشد!",
      icon: "error",
      buttons: ["خیر !", "بله !"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api.delete(`${ROOT_URL}${url}?id=${id}`, config).then((res) => {
          if (res.status === 200) {
            swal("با موفقیت حذف شد", {
              icon: "success",
            }).then(() => {
              dispatch(action(res.data));
            });
          } else {
            swal("حذف نشد، خطایی پیش آمد!", {
              icon: "error",
            });
          }
        });
      }
    });
  } catch (err) {
    swal(`${err}!`, {
      icon: "error",
    });
  }
}
export default DeleteData;
