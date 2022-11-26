function plugin(app) {
  const name = "demo-plugin";

  function run(params) {
    // 全局配置
    // const { ...demoConfig } = app.config.demo;
    // 判断是否已安装某插件
    // const hasAccess = app.plugins.has("access");
    // 获取其他已安装的插件
    // const accessPlugin = app.plugins.get("access");
    // 直接调用其他组件的 run 方法
    // app.plugins.apply("react-render", <div>Hello Demo!</div>);
  }

  // 生命周期 - 安装
  function mount() {
    console.log("安装了 Demo 插件");
  }

  // 生命周期 - 卸载
  function unmount() {
    console.log("卸载了 Demo 插件");
  }

  return { name, run, mount, unmount };
}

export default plugin;
