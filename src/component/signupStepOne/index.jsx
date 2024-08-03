// import React from "react";
import loginImage from "../../assets/images/loginSvg.svg";
import styles from "./signUpStepOne.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../contexts/RegisterFormContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import { registerUser, registerUserWithGoogle } from "../../store/Slices/usersSlice";
export default function SignUpStepOne() {
  const { formData, updateFormData, nextStep } = useFormContext();
  
    const navigate = useNavigate(); 
    const allUsers = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  
  const [isSinUp, setIsSinUp] = useState("false");
  const [comfirmPassVal, setComfirmPassword] = useState("");

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("The first name is required")
      .min(2, "Please enter more than 2 characters")
      .max(15, "Please enter less than 15 characters"),
    lastName: Yup.string()
      .required("The last name is required")
      .min(2, "Please enter more than 2 characters")
      .max(15, "Please enter less than 15 characters"),
    email: Yup.string()
      .required("The email is required")
      .email("Please enter a valid email"),
    phone: Yup.string()
      .required("The phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Please enter a valid phone number"),
    password: Yup.string()
      .required("The password is required")
      .min(8, "Minimum length should be 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      password: formData.password || "",
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      if (formik.values.password != comfirmPassVal) return;
           const isEmailExist = allUsers.find(
             (user) => user.email === val.email
           );
           if (isEmailExist) {
             toast.error("Email already exists");
             return;
           } else {
             updateFormData(val);
             nextStep();
           }
    
    },
  });







    const handleGoogleSuccess = async (credentialResponse) => {
      try {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("hellllo",decoded);
        const User = {
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          email: decoded.email,
          googleId: decoded.sub,
          phone:"",
          password:'',
        };
         const isEmailExist = allUsers.find(
           (user) => user.email === User.email
        );
        if (isEmailExist) {
          toast.error("Email already exists");
          return;
        } else {
          // dispatch(registerUserWithGoogle(User));
          updateFormData(User);
           console.log(User);
           nextStep();
          //  navigate("/home");
        }
      } catch (error) {
        console.error("Error during Google login", error);
        toast.error("Error during Google login");
      }
    };

  return (
    <section className={styles.register}>
      <div className={`container ${styles.loginContain}`}>
        <div className={`row ${styles.registerForm}`}>
          <div className={`${styles.sectionLeft} col-7 p-4`}>
            <div className="leftTitle text-center mb-5">
              <h2>Create Account</h2>
              <p>
                Search all the open positions on the web. Get your own
                personalized salary estimate. Read reviews on over 600,000
                companies worldwide.
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="nameInputs d-flex align-items-center  ">
                <div
                  className={`form-group position-relative input-component w-50 me-2`}
                >
                  <div className="position-relative">
                    <label
                      htmlFor="f-name"
                      className={`position-absolute bg-white  ${styles.label}`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="f-name"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div>
                    {formik.errors.firstName && formik.touched.firstName ? (
                      <p className="text-danger p-0 m-0">
                        {formik.errors.firstName}
                      </p>
                    ) : (
                      <span className=" opacity-0">. </span>
                    )}
                  </div>
                </div>
                <div className="form-group position-relative input-component w-50">
                  <div className="position-relative">
                    <label
                      htmlFor="l-name"
                      className={`position-absolute bg-white ${styles.label}`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="l-name"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.errors.lastName && formik.touched.lastName ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.lastName}
                    </span>
                  ) : (
                    <span className="opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="form-group position-relative input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="email"
                    className={`position-absolute bg-white ${styles.label}`}
                  >
                    Email Adress
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="mt-4 form-control"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div>
                  {formik.errors.email && formik.touched.email ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.email}
                    </span>
                  ) : (
                    <span className=" opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="form-group position-relative input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="phone"
                    className={`position-absolute bg-white ${styles.label}`}
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="mt-4 form-control"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div>
                  {formik.errors.phone && formik.touched.phone ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.phone}
                    </span>
                  ) : (
                    <span className=" opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="form-group input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="Password"
                    className={`bg-white ${styles.label}`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="mt-4 form-control"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div>
                  {formik.errors.password && formik.touched.password ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.password}
                    </span>
                  ) : (
                    <span className=" opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="form-group input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="confirmPassword"
                    className={`bg-white ${styles.label}`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="userConfirmPassword"
                    id="confirmPassword"
                    className="mt-4 form-control"
                    onChange={(e) => setComfirmPassword(e.target.value)}
                    value={comfirmPassVal}
                  />
                </div>

                <div>
                  {formik.values.password !== comfirmPassVal &&
                  comfirmPassVal ? (
                    <span className="text-danger p-0 m-0">
                      Passwords do not match
                    </span>
                  ) : (
                    <span className="opacity-0">. </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 m-auto mb-3 mt-3 d-flex align-items-center justify-content-center"
              >
                Next
              </button>
            </form>
            <p className="d-flex ">
              Already have an account?
              <NavLink
                to="/login"
                className="text-success text-decoration-none"
              >
                <span>Sign in</span>
              </NavLink>
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <div className={styles.line}></div>
              <span className="p-2 bg-white">or</span>
              <div className={styles.line}></div>
            </div>
            <div >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleGoogleSuccess(credentialResponse);
                }}
              />
            </div>
         
            <NavLink
              to="/companyRegister"
              className={`text-decoration-none text-center btn-outline-success border border-1 border-success rounded-2 p-2 m-2`}
            >
              Register As a<span className="text-success"> Company</span>
            </NavLink>
          </div>
          <div className={`${styles.sectionRigth} col-5`}>
            <div className="rigth-title">
              <h2>Get The Right Job You Deserve</h2>
            </div>
            <div className="rigth-img">
              <img src={loginImage} alt="login Image" width="100%" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
