// 组件权限校验、路由权限校验
// 获取当前权限
function plugin(app) {
  const name = "access";

  // 生命周期 - 安装
  function mount() {
    console.log("安装了 access 插件");
  }

  // 生命周期 - 卸载
  function unmount() {
    console.log("卸载了 access 插件");
  }

  return { name, mount, unmount };
}

export default plugin;
