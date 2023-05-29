import {Navigate, Outlet} from "react-router-dom";
import {PrivateLayout} from "../components";
import {useContext} from "react";
import {AuthContext} from "../contexts";

export const PrivateRoutes = () => {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    isAuthenticated ?
      <PrivateLayout>
        <Outlet/>
      </PrivateLayout>
      : <Navigate to={'/login'}/>
  );
};
