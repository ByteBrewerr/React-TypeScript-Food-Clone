import { ToastContainer } from "react-toastify";
import "./App.scss";
import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router";
import FeedbackPage from "./pages/FeedbackPage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserInfo from "./components/profile/UserInfo/UserInfo";
import OrderHistory from "./components/profile/OrderHistory/OrderHistory";

function App() {
  return (
    <>
      <ToastContainer theme="dark" newestOnTop={true} />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index path="personalData" element={<UserInfo />} />
          <Route path="orderHistory" element={<OrderHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
