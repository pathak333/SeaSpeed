import { AuthenticatedRouteProps } from "../../types/propes.types";

import { Navigate } from "react-router";

const AuthenticatedRoute = ({
  accessToken,
  outlet,
}: AuthenticatedRouteProps): JSX.Element => {
  if (!accessToken) <Navigate to="/auth" replace />;
  return outlet;
};

export default AuthenticatedRoute;
