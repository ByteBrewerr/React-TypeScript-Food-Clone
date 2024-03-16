import { Route, Routes } from "react-router-dom";
import FeedbackPage from "../../pages/FeedbackPage/FeedbackPage";
import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/MainPage";
import OrderDetailsPage from "../../pages/OrderDetailsPage/OrderDetailsPage";
import OrderPage from "../../pages/OrderPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import RegisterPage from "../../pages/RegisterPage";
import FeedbackHistory from "../profile/FeedbackHistory/FeedbackHistory";
import OrderHistory from "../profile/OrderHistory/OrderHistory";
import UserInfo from "../profile/UserInfo/UserInfo";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
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
);

export default AppRoutes;
