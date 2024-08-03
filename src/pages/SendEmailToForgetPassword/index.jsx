import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestOTP, verifyOTP, resetPassword } from "../../store/Slices/usersSlice";
import styles from "./SendEmailToForgetPassword.module.css";
import forgetImage from '../../assets/images/Forgot password-amico 1.svg'
import { toast } from "react-toastify";
const SendEmailToForgetPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, otpVerified } = useSelector((state) => state.users);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateOTP = (otp) => {
    const re = /^\d{6}$/;
    return re.test(otp);
  };




  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };



  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage("Invalid email format");
      return;
    }
    try {
      await dispatch(requestOTP({ email })).unwrap();
      // setMessage("Code has been sent to your email");
      toast.info("Code has been sent to your email");
      setShowOTPInput(true);
    } catch (err) {
      console.error("Failed to request OTP:", err);
      // setMessage("Failed to request code");
      toast.error("Failed to request code");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!validateOTP(OTP)) {
      // setMessage("Invalid OTP format");
       toast.error("Invalid OTP format");
      return;
    }
    try {
      await dispatch(verifyOTP({ otp: OTP, email })).unwrap();
      // setMessage("OTP verified successfully");
       toast.success("OTP verified successfully");
      setShowNewPasswordInput(true);
    } catch (err) {
      console.error("Failed to verify OTP:", err);
      // setMessage("Failed to verify OTP: " + err.message);
       toast.error("Failed to verify OT" + err.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      setMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }
    try {
      await dispatch(resetPassword({ email, newPassword })).unwrap();
      // setMessage("Password reset successful");
       toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      console.error("Failed to reset password:", err);
      // setMessage("Failed to reset password");
       toast.error("Failed to reset password");
    }
  };

  return (
    <section className={styles.register}>
      <div className={`container ${styles.loginConain}`}>
        <div className={`row ${styles.registerForm}`}>
          <div className={`${styles.sectionLeft} col-7 p-4`}>
            <div className={styles.loginSec}>
              <div className="text-center">
                <h4 className="mt-4 text-success">Forgot your password?</h4>
                <p className="text-bg-secondary-subtle fw-bold mb-5 w-75 m-auto">
                  Don’t worry, happens to all of us. Enter your email below to
                  recover your password
                </p>
                <Form
                  className={`m-auto col-12 ${styles.formContainer}`}
                  onSubmit={
                    showNewPasswordInput
                      ? handleResetPassword
                      : showOTPInput
                      ? handleVerifyOTP
                      : handleRequestOTP
                  }
                >
                  <Form.Group className="mb-4 position-relative">
                    <Form.Label
                      className={`position-absolute bg-white ${styles.inputLabel}`}
                      column
                      sm={2}
                    >
                      Email
                    </Form.Label>

                    <Form.Control
                      className={`${styles.jobSeekerInput} ${styles.inputField}`}
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Please write your email"
                      required
                    />
                  </Form.Group>
                  {showOTPInput && (
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label
                        className={`position-absolute bg-white ${styles.inputLabel}`}
                        column
                        sm={2}
                      >
                        code
                      </Form.Label>

                      <Form.Control
                        className={`${styles.jobSeekerInput} ${styles.inputField}`}
                        name="otp"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="Please write your code"
                        required
                      />
                    </Form.Group>
                  )}
                  {showNewPasswordInput && otpVerified && (
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label
                        className={`position-absolute bg-white ${styles.inputLabel}`}
                        column
                        sm={2}
                      >
                        New Password
                      </Form.Label>

                      <Form.Control
                        type="password"
                        className={`${styles.jobSeekerInput} ${styles.inputField}`}
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        required
                      />
                    </Form.Group>
                  )}
                  {message && <p className=" mt-3 text-start text-danger">{message}</p>}
                  <div className="w-100">
                    <Button
                      variant="success w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading
                        ? "sending..."
                        : showNewPasswordInput
                        ? "Reset Password"
                        : showOTPInput
                        ? "Verify code"
                        : "send code"}
                    </Button>
                  </div>
                </Form>
                <p className="d-flex mt-2">
                  Don't have an account?
                  <NavLink
                    to="/signUp"
                    className="text-success text-decoration-none"
                  >
                    Sign Up
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.sectionRigth} col-5 `}>
            <div className="rigth-title mt-5">
              <h2>Don’t worry ! It happens.</h2>
            </div>
            <div className="rigth-img">
              <img src={forgetImage} alt="login Image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SendEmailToForgetPassword;
