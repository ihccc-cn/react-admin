import CountButton from "@/common/components/count";

export function plugin(app) {
  const name = "count";

  // 生命周期 - 安装
  function mount() {
    app.slots.set("countSlot", <CountButton />);
  }

  // 生命周期 - 卸载
  function unmount() {
    app.slots.del("countSlot");
  }

  return { name, mount, unmount };
}

export default plugin;
