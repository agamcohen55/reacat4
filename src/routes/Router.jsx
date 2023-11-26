import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/login/LoginPage";
import Directing from "../pages/Directing";
import Cards from "../pages/cardsPage";
import CrateCard from "../pages/crateCard";
import Editcard from "../pages/Editcard";
import ProfileEdit from "../pages/profileEdit";
import RegisterPage from "../pages/register/RegisterPage";
import HomePage from "../pages/HomePage";
import AuthGuard from "../Guard/AuthGuard";
import AuthPrevent from "../Guard/AuthPrevent";
import AuthPreventNoAlert from "../Guard/AuthPreventNoAlert";
import PageNotFound from "../pages/PageNotFound";
import FavoriteCards from "../pages/FavoritCardPage";
import SandBoxPage from "../pages/sandBoxPage";
import AuthAdminGuard from "../Guard/AuthAdminGuard";
//all the app routes
const Router = () => {
  return (
    <Routes>
      <Route index element={<Directing />} />
      <Route path={"*"} element={<PageNotFound />} />
      <Route
        path={ROUTES.HOME}
        element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <AuthGuard>
            <AuthAdminGuard>
              <SandBoxPage />
            </AuthAdminGuard>
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <AuthPreventNoAlert>
            <LoginPage />
          </AuthPreventNoAlert>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <AuthPrevent>
            <RegisterPage />
          </AuthPrevent>
        }
      />
      <Route path={ROUTES.CARDS}>
        <Route index element={<Cards />} />
        <Route
          path="crateCard"
          element={
            <AuthGuard>
              <CrateCard />
            </AuthGuard>
          }
        />
        <Route
          path=":cardId/edit"
          element={
            <AuthGuard>
              <Editcard />
            </AuthGuard>
          }
        />
        <Route
          path="favorite"
          element={
            <AuthGuard>
              <FavoriteCards />
            </AuthGuard>
          }
        />
      </Route>
      <Route path={ROUTES.PROFILE}>
        <Route
          index
          element={
            <AuthGuard>
              <PageNotFound />
            </AuthGuard>
          }
        />
        <Route
          path=":userId"
          element={
            <AuthGuard>
              <ProfileEdit />
            </AuthGuard>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
