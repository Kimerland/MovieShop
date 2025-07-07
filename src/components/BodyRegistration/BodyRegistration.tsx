import React from "react";
import styles from "./BodyRegistration.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";
import { registrationSchema, RegistrationSchemaType } from "../../../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const BodyRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const navigate = useNavigate();

  const handleRegistration = async (data: RegistrationSchemaType) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        data
      );

      if (response.status === 201) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(response.data.message);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      alert(
        err.response?.data.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(handleRegistration)}>
        <p className={styles.title}>MovieLand</p>

        <label>
          <p className={styles.username}>Username</p>
          <input type="text" {...register("username")} />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </label>

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

        <label>
          <p className={styles.password}>Confirm Password</p>
          <input {...register("confirmPassword")} type="password" />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </label>

        <button className={styles.butLog} type="submit">
          <p className={styles.login}>Signup</p>
        </button>
        <p className={styles.userText}>
          Registered User?{" "}
          <Link className={styles.registerText} to="/login">
            Login here
          </Link>
        </p>
      </form>
    </main>
  );
};

export default BodyRegistration;
