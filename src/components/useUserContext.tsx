import { createContext, useContext } from "react";

export interface userType {
  name: string;
  email: string;
  data: { [month: number]: monthTransactionsType };
}

export interface monthTransactionsType {
  profit: number;
  expenses: number;
  spending_items: [[string, number]];
}

export const userDataContext = createContext({
  userData: {} as userType,
  setUserData: (() => {}) as React.Dispatch<React.SetStateAction<userType>>,
});

export const useUserContext = () => useContext(userDataContext);
