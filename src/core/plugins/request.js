// 提供统一的请求处理，以及数据缓存等的能力
import { extend } from "umi-request";

function plugin(app) {
  const name = "umi-request";

  // 生命周期 - 安装
  function mount() {
    const { server, requestInterceptors } = app.config.request;

    app.request = extend({
      // 服务地址替换
      // 页码参数自动转换
      // 全局请求头参数设置
      // 参数转换
      // url 解码
      requestInterceptors: [].concat(requestInterceptors || []),
      errorHandler: error => {
        // const { response } = error;
        // if (response && response.status === 401) {
        // }
        // if (!response) {
        //   notification.error({
        //     description: "您的网络发生异常，无法连接服务器",
        //     message: "网络异常",
        //   });
        // }
        // throw error;
      },
    });
  }

  // 生命周期 - 卸载
  function unmount() {
    delete app.request;
  }

  return { name, mount, unmount };
}

export default plugin;
