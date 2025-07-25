import { useState } from "react";
import { MyContext } from "./Mycontext.js";

const MyContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});

  const valueObj = { count, setCount, user };

  return <MyContext.Provider value={valueObj}>{children}</MyContext.Provider>;
};

export { MyContextProvider };
