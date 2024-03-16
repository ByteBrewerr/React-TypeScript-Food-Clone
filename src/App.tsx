import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
import { observer } from "mobx-react-lite";
import AppRoutes from "./components/routes/AppRoutes";
import "./styles/global.scss";

function App() {
  return (
    <>
      <ToastContainer theme="dark" newestOnTop={true} />
      <Header />
      <AppRoutes />
    </>
  );
}

export default observer(App);
