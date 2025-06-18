import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start.jsx";
import UserLogin from "./pages/user/userLogin.jsx";
import UserSignUp from "./pages/user/UserSignUp.jsx";
import CaptainLogin from "./pages/captain/CaptainLogin.jsx";
import CaptainSignUp from "./pages/captain/CaptainSignUp.jsx";
import Home from "./pages/user/Home.jsx";
import UserProtectedWrapper from "./pages/user/UserProtectedWrapper.jsx";
import CaptainHome from "./pages/captain/CaptainHome.jsx";
import CaptainProtectedWrapper from "./pages/captain/CaptainProtectedWrapper.jsx";
import Riding from "./pages/user/Riding.jsx";
import CaptainRiding from "./pages/captain/CaptainRiding.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
      </Routes>
    </div>
  );
};

export default App;
