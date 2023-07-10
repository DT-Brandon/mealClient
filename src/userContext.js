import { useState, createContext } from "react";
import { ReactSession } from "react-client-session";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState();

  const logout = () => {
    setUserInfo();
    ReactSession.set("user", "");
  };
  const restartSession = () => {
    if (ReactSession.get("user") !== undefined && !userInfo) {
      if (ReactSession.get("user") !== "") {
        setUserInfo(JSON.parse(ReactSession.get("user")));
      }
    }
  }
  const value = {
    userInfo,
    setUserInfo,
    logout,
    restartSession,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
