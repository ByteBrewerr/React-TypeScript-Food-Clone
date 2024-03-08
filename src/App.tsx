import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./components/Header/Header";
import { observer } from "mobx-react-lite";
import AppRoutes from "./components/routes/AppRoutes";

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
