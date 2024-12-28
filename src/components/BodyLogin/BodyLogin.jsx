import React, { useState } from "react";
import styles from "./BodyLogin.module.scss";
import { Link, useNavigate } from "react-router-dom";

const BodyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Please enter a valid email!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be min 6 characters long!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Successful!");
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSearch}>
        <p className={styles.title}>MovieLand</p>

        <label>
          <p className={styles.email}>Email</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          <p className={styles.password}>Password</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </label>

        <button className={styles.butLog} type="submit">
          <p className={styles.login}>Login</p>
        </button>
        <p href="" className={styles.userText}>
          New User?{" "}
          <Link className={styles.registerText} to="/registration">
            Register here
          </Link>
        </p>
      </form>
    </main>
  );
};

export default BodyLogin;