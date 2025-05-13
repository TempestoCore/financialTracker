import { useState } from "react";
import { userDataContext } from "./useUserContext";
import type { userType } from "./useUserContext";

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<userType>({} as userType);
  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </userDataContext.Provider>
  );
}
