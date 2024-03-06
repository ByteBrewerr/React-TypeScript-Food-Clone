import React, { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/userStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoadingUser, isAuth } = userStore;
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isLoadingUser) {
        return;
      }
      if (!isAuth) {
        navigate("/login");
        return;
      }
    };

    checkAuthentication();
  }, [isLoadingUser]);

  return <>{userStore.isAuth && children}</>;
};

export default observer(ProtectedRoute);
