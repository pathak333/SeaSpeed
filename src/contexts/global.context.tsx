import { createContext, Dispatch, useContext, useReducer } from "react";
import { LOADING, LOGIN, LOGOUT, DATA, TEMP } from "../constants/action.constant";
import { ChildrenProps, GlobalState } from "../types/propes.types";

const initialGlobalState = {
  accessToken: sessionStorage.getItem("token") || null,
  role:"",
  loading: false,
  data: sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data") || {}.toString()) :  null,
  temp: null,
};

export const globalContext = createContext<{
  globalState: GlobalState;
  dispatch: Dispatch<React.SetStateAction<any>>;
}>({ globalState: initialGlobalState, dispatch: () => null });

const AuthReducer = (state: any, action: any) => {
  console.log("state= ",state,"action=",action);
  
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case TEMP:
      return { ...state, temp: action.payload };
    case DATA:
      return { ...state, data: action.payload };
    case LOGIN:
      return { ...state, accessToken: action.payload, role:action.role };
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
