import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {DashboardPage, LandingPage, LoginPage, RegisterPage, SettingsPage} from "../pages";
import {PrivateRoutes} from "./PrivateRoutes.tsx";
import {PublicRoutes} from "./PublicRoutes.tsx";
import {AddNewWordPageXXX} from "../pages/AddNewWordPageXXX.tsx";
import {WordListPage} from "../pages/WordListPage.tsx";
import {AboutPage} from "../pages/AboutPage.tsx";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes/>}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Route>
        <Route element={<PrivateRoutes/>}>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/add-new-word" element={<AddNewWordPageXXX/>}/>
          <Route path="/word-list/:wordType" element={<WordListPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
