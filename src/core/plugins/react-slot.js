import React from "react";
import EventEmitter from "eventemitter3";

class Slots extends EventEmitter {
  static events = {
    ADD: "add",
    DEL: "remove",
  };
  constructor(app) {
    super();

    this.app = app;
    this.slots = new Map();
  }
  get(name) {
    return this.slots.get(name);
  }
  set(name, content) {
    this.slots.set(name, content);
    this.emit(Slots.events.ADD, name);
  }
  del(name) {
    this.slots.delete(name);
    this.emit(Slots.events.DEL, name);
  }
}

function useSlot(name) {
  const [_, update] = React.useState({});
  React.useEffect(() => {
    const updateOnChange = slot => slot === name && update({});
    this.slots.on(Slots.events.ADD, updateOnChange);
    this.slots.on(Slots.events.DEL, updateOnChange);
    return () => {
      this.slots.off(Slots.events.ADD, updateOnChange);
      this.slots.off(Slots.events.DEL, updateOnChange);
    };
  }, []);
  return this.slots.get(name) || null;
}

function getSlot(app) {
  return ({ name }) => useSlot.call(app, name);
}

function plugin() {
  const name = "react-slot";

  // 生命周期 - 安装
  function mount() {
    this.slots = new Slots(this);
    this.useSlot = useSlot.bind(this);
    this.Slot = getSlot(this);
  }

  // 生命周期 - 卸载
  function unmount() {
    delete this.slots;
    delete this.useSlot;
    delete this.Slot;
  }

  return { name, mount, unmount };
}

export default plugin;
