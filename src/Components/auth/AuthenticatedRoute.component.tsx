import { AuthenticatedRouteProps } from "../../types/propes.types";

import { Navigate } from "react-router";

const AuthenticatedRoute = ({
  accessToken,
  outlet,
}: AuthenticatedRouteProps): JSX.Element => {
  // const navigate = useNavigate();

  if (accessToken === null) return <Navigate to="/auth/login" replace={true} />; //navigate("/auth/login"); //
  return outlet;
};

export default AuthenticatedRoute;
