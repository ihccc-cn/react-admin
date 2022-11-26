import React from "react";

export default React.createContext({
  pin: false,
  setPin: () => {},
  fold: false,
  setFold: () => {},
  scrolled: false,
});
