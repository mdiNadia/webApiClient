import swal from "sweetalert";
import api, { config, ROOT_URL } from "../api";
async function ListData({
  url,
  action,
  dispatch,
  pageno,
  currentPage,
  searchValue,
  sortValue,
  pageSizeValue,
  keyValue,
  history,
  module,
  setLoading,
}) {
  debugger
  try {
    await api
      .get(
        `${ROOT_URL}${url}?pageno=${pageno ?? currentPage}&search=${
          searchValue.length >= 3 ? searchValue : ""
        }&key=${keyValue}&sortId=${sortValue}&take=${pageSizeValue}`,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(action(res.data));
          // history.push({
          //   pathname: module,
          //   search:
          //     "?" +
          //     new URLSearchParams({
          //       pageno: pageno ?? currentPage,
          //       search: searchValue,
          //       key: keyValue,
          //       sortId: sortValue,
          //       take: pageSizeValue,
          //     }).toString(),
          // });
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
export default ListData;
