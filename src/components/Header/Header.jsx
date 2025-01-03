import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <p className={styles.title}>MovieLand</p>
        <div className={styles.rightSection}>
          <Link className={styles.films} to="/movies">
            All Films
          </Link>
          {currentUser ? (
            <div>
              <Link to="/profile">
                <img className={styles.profile} src="/profile.png" />
              </Link>
            </div>
          ) : (
            <button className={styles.butLog}>
              <Link className={styles.login} to="/">
                Login
              </Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
