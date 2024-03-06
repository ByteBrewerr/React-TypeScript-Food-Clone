import { ToastContainer } from "react-toastify";
import "./App.scss";
import MainPage from "./pages/MainPage";
import { Route, Routes, useNavigate } from "react-router";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserInfo from "./components/profile/UserInfo/UserInfo";
import OrderHistory from "./components/profile/OrderHistory/OrderHistory";
import OrderPage from "./pages/OrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import FeedbackHistory from "./components/profile/FeedbackHistory/FeedbackHistory";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { observer } from "mobx-react-lite";

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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route path="personalData" element={<UserInfo />} />
          <Route path="orderHistory" element={<OrderHistory />} />
          <Route path="orderHistory/:orderNumber" element={<OrderDetailsPage />} />
          <Route path="feedbackHistory" element={<FeedbackHistory />} />
        </Route>
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default observer(App);
