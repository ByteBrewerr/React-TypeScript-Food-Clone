import React, { FC } from "react";
import Header from "../components/header";
import PagesNavigation from "../components/pages_navigation";

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <PagesNavigation />
      </div>
    </>
  );
};

export default MainPage;
