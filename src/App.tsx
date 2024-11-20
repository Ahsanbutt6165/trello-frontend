import Home from "./Pages/Home/Page";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./Pages/register/Page";
import Login from "./Pages/login/Page";

import { HOME_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "./constants";
import { RootState } from "./feautures/store/store";
import { useSelector } from "react-redux";

const App = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <div className=" bg-no-repeat  bg-cover bg-[url('https://images.saymedia-content.com/.image/t_share/MjAxNjEwOTc3NjIyMzcwMTA0/black-color-some-history-and-trends.jpg')]">
      <BrowserRouter>
        <Routes>
          <Route
            path={HOME_ROUTE}
            element={isAuth ? <Home /> : <Navigate to={LOGIN_ROUTE} />}
          />
          <Route
            path={SIGNUP_ROUTE}
            element={isAuth ? <Navigate to={HOME_ROUTE} /> : <Register />}
          />
          <Route
            path={LOGIN_ROUTE}
            element={isAuth ? <Navigate to={HOME_ROUTE} /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
