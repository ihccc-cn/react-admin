import app from "@/core";

/**
 * 获取所有角色缓存
 */
export async function roles(params) {
  return app.request("/role/list", {
    params,
  });
}
