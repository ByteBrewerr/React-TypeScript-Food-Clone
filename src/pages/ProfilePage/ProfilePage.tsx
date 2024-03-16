import { Outlet } from "react-router";
import ProfileSidebar from "../../components/profile/ProfileSidebar/ProfileSidebar";
import "./profilePage.scss";

const ProfilePage = () => {
  return (
    <div className="container profilePage">
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default ProfilePage;
