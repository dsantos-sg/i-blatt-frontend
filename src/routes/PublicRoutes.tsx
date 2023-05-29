import {Outlet} from "react-router-dom";
import {PublicLayout} from "../components";

export const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Outlet/>
    </PublicLayout>
  );
};
