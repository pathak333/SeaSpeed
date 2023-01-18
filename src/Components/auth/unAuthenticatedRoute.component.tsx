import { AuthenticatedRouteProps } from "../../types/propes.types";
import { Navigate } from "react-router";

const UnAuthenticatedRoute = ({
  accessToken,
  outlet,
}: AuthenticatedRouteProps): JSX.Element => {
  if (accessToken) <Navigate to="/app" replace />;
  return outlet;
};

export default UnAuthenticatedRoute;
