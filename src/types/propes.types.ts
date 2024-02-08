import { Auth } from "./user.type";

export interface AuthenticatedRouteProps {
  accessToken: string | null;
  outlet: JSX.Element;
}

export interface ContextProps {
  children: JSX.Element;
}

export interface GlobalState {
  loading: boolean;
  accessToken: string | null;
  role: String;
  data: any;
  temp: any;
}

export interface ChildrenProps {
  children: JSX.Element;
}


export interface Option {
  readonly label: string;
  readonly value: string;
}
