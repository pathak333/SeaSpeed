import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { LOADING, LOGIN, LOGOUT } from "../constants/action.constant";
import {
  ChildrenProps,
  ContextProps,
  GlobalState,
} from "../types/propes.types";
import { Auth } from "../types/user.type";

const initialGlobalState = {
  accessToken: null,
  loading: false,
};

export const globalContext = createContext<{
  globalState: GlobalState;
  dispatch: Dispatch<React.SetStateAction<any>>;
}>({ globalState: initialGlobalState, dispatch: () => null });

const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case LOGIN:
      return { ...state, accessToken: action.payload };
    case LOGOUT:
      //logout();
      return null;

    default:
      return state;
  }
};

const initValue: GlobalState = initialGlobalState;

export const GlobalProvider = ({ children }: ChildrenProps) => {
  const [globalState, dispatch] = useReducer(AuthReducer, initValue);
 
  return (
    <globalContext.Provider value={{ globalState, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalState = () => {
  const { globalState, dispatch } = useContext(globalContext);
  return [globalState, dispatch] as const;
};
