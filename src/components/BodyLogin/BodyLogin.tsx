import React, { useState, useEffect, FormEvent } from "react";
import styles from "./BodyLogin.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../../../schemas";

interface LoginRespons {
  token: string;
  message: string;
}

const BodyLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      navigate("/movies");
    }
  }, [navigate]);

  const handleLogin = async (data: LoginSchemaType) => {
    try {
      const response = await axios.post<LoginRespons>(
        "http://localhost:5000/api/login",
        data
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("Successful login!");
        navigate("/movies");
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data.message || "Error! Please try again.");
      } else {
        alert("Error! Please try again.");
      }
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        <p className={styles.title}>MovieLand</p>

        <label>
          <p className={styles.email}>Email</p>
          <input {...register("email")} type="email" />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </label>

        <label>
          <p className={styles.password}>Password</p>
          <input {...register("password")} type="password" />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </label>

        <button className={styles.butLog} type="submit">
          <p className={styles.login}>Login</p>
        </button>
        <p className={styles.userText}>
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
