import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

export interface User {
  email: string;
}

interface HeaderProps {
  isSticky: boolean;
}

export interface ProfileMenuProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Header: React.FC<HeaderProps> = ({ isSticky }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
          setCurrentUser(server.data.user);
        } catch (error) {
          console.error("Undefined user", error);

          localStorage.removeItem("token");
        }
      }
    };

    userData();
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.movie_logo}>
          <img src={`http://localhost:5000/api/images/Logo.svg`} />
          <Link className={styles.title} to="/">
            MovieLand
          </Link>
        </div>
        <div className={styles.rightSection}>
          {currentUser ? (
            <>
              <Link className={styles.films} to="/movies">
                All Films
              </Link>

              <div className={styles.header_container}>
                <Link className={styles.link_style} to="/watchlist">
                  <p className={styles.watchlist_profile}>MY Watchlists</p>
                </Link>

                <ProfileMenu setCurrentUser={setCurrentUser} />
              </div>
            </>
          ) : (
            <>
              <button className={styles.butLog}>
                <Link className={styles.login} to="/login">
                  Login
                </Link>
              </button>

              <button className={styles.butLog}>
                <Link className={styles.login} to="/registration">
                  JOIN
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
