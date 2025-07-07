import React, { FC, useEffect, useState } from "react";
import ProfileStyles from ".//ProfileStyles.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProfileMenuProps } from "../Header/Header";
import LogOutBtn from "../Buttons/LogOutBtn/LogOutBtn";

const ProfileMenu: FC<ProfileMenuProps> = ({ setCurrentUser }) => {
  const [initialState, setInitialState] = useState<boolean>(false);
  const [user, setUser] = useState<{
    username: string;
    email: string;
    avatarUrl: string;
  }>({
    username: "",
    email: "",
    avatarUrl: "",
  });

  const toogleMenu = () => {
    setInitialState((prev) => !prev);
  };

  useEffect(() => {
    const userData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const server = await axios.get("http://localhost:5000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("User data:", server.data.user);
          setUser(server.data.user);
        } catch (error) {
          console.error("Undefined user", error);

          localStorage.removeItem("token");
        }
      }
    };
    userData();
  }, []);

  return (
    <div
      className={ProfileStyles.profileContainer}
      onMouseLeave={() => setInitialState(false)}
    >
      {initialState === true ? (
        <div className={ProfileStyles.nav_menu}>
          <ul>
            <img
              className={`${ProfileStyles.profile} ${ProfileStyles.nav_avatar}`}
              src={user.avatarUrl || "/profile.png"}
            />
            <p className={ProfileStyles.user_text}>{user.username}</p>
            <p className={ProfileStyles.email_text}>{user.email}</p>
            <hr />
            <Link to="/cinema">Cinema Hub</Link>
            <Link to="/subscribe">Subscribe</Link>
            <hr />
            <Link to="/messages">Messages</Link>
            <Link to="/settings">Settings</Link>
            <hr />
            <LogOutBtn setCurrentUser={setCurrentUser} />
          </ul>
        </div>
      ) : (
        <img
          className={ProfileStyles.profile}
          src={user.avatarUrl || "/profile.png"}
          onClick={toogleMenu}
        />
      )}
    </div>
  );
};

export default ProfileMenu;
