// import { removeStorage } from "base-components-antd/lib/utils";

/**
 * 退出登录，并且将当前的 url 保存
 */
export const loginOut = async () => {
  // const { query = {}, pathname } = history.location;
  // const { redirect } = query; // Note: There may be security issues, please note
  // if (window.location.pathname !== "/user/login" && !redirect) {
  //   removeStorage(["token", "userInfo"]);
  //   history.replace({
  //     pathname: "/user/login",
  //     search: "redirect=" + pathname,
  //   });
  // }
};

export const uuid = ((start = 0) => {
  let id = start;
  return (prefix = "key") => `${prefix}_${id++}`;
})();
