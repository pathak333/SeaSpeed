import { AuthenticatedRouteProps } from "../../types/propes.types";
import { Navigate } from "react-router";


const UnAuthenticatedRoute = ({
  accessToken,
  outlet,
}: AuthenticatedRouteProps): JSX.Element => {
 

  if (accessToken) return <Navigate to="/dashboard/home" replace />;
  return outlet;
};

export default UnAuthenticatedRoute;
