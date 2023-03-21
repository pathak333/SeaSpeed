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
  data: any;
}

export interface ChildrenProps {
  children: JSX.Element;
}
