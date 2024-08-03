// import React from "react";
import loginImage from "../../assets/images/loginSvg.svg";
import styles from "./signupStepTow.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFormContext } from "../../contexts/RegisterFormContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getAllUsersAction, registerUser } from "../../store/Slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SignUpStepTwo() {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const allUsers = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue && !selectedSkills.includes(inputValue)) {
        setSelectedSkills([...selectedSkills, inputValue]);
      }
      setInputValue("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((item) => item !== skill));
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  useEffect(() => {
    formik.setFieldValue("skills", selectedSkills);
  }, [selectedSkills]);

  async function signUp(val) {
    console.log(allUsers);
    console.log(selectedSkills);
    try {
      updateFormData(val);
      const User = { ...formData, ...val };
      console.log(User);
      const isEmailExist = allUsers.find((user) => user.email === User.email);
      console.log(isEmailExist);
      if (!isEmailExist) {
        dispatch(registerUser(User));
        console.log("llllllllllooooooo",User);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err);
    }
  }
 

  const validationSchema = Yup.object({
    city: Yup.string().required("The city is required"),
    country: Yup.string().required("The country is required"),
    category: Yup.string().required("The category is required"),
    experienceLevel: Yup.string().required("The Experience Level is required"),
    desiredJobType: Yup.string().required("The Desired Job Type is required"),
    qualifications: Yup.string().required("The Qualifications is required"),
    skills: Yup.array().min(1, "At least one skill is required"),
  });

  const formik = useFormik({
    initialValues: {
      city: formData.city || "",
      country: formData.country || "",
      category: formData.category || "",
      experienceLevel: formData.experienceLevel || "",
      desiredJobType: formData.desiredJobType || "",
      qualifications: formData.qualifications || "",
      skills: formData.skills || selectedSkills,
    },
    validationSchema: validationSchema,
    onSubmit: signUp,
  });

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
                      htmlFor="city"
                      className={`position-absolute bg-white  ${styles.label}`}
                    >
                      City
                    </label>
                    <select
                      name="city"
                      id="city"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.city}
                      onBlur={formik.handleBlur}
                    >
                      <option value=""></option>
                      <option value="Aswan">Aswan</option>
                      <option value="Luxor">Luxor</option>
                      <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                      <option value="Giza">Giza</option>
                      <option value="Alexandria">Alexandria</option>
                      <option value="Cairo">Cairo</option>
                      <option value="Hurghada">Hurghada</option>
                      <option value="Helwan">Helwan</option>
                      <option value="Sohag">Sohag</option>
                      <option value="Quesna">Quesna</option>
                      <option value="Al Khankah">Al Khankah</option>
                      <option value="el-Arab">el-Arab</option>
                      <option value="Badr">Badr</option>
                      <option value="Sadat City">Sadat City</option>
                      <option value="Obour">Obour</option>
                      <option value="New Cairo">New Cairo</option>
                      <option value="6th of October City">
                        6th of October City
                      </option>
                      <option value="Banha">Banha</option>
                      <option value="Shibin El Kom">Shibin El Kom</option>
                      <option value="Qalyub">Qalyub</option>
                      <option value="Marsa Matruh">Marsa Matruh</option>
                      <option value="Arish">Arish</option>
                      <option value="Kafr El Sheikh">Kafr El Sheikh</option>
                      <option value="El-Mahalla El-Kubra">
                        El-Mahalla El-Kubra
                      </option>
                      <option value="Damietta">Damietta</option>
                      <option value="Assiut">Assiut</option>
                      <option value="Qena">Qena</option>
                      <option value="Sohag">Sohag</option>
                      <option value="Minya">Minya</option>
                      <option value="Beni Suef">Beni Suef</option>
                      <option value="Faiyum">Faiyum</option>
                    </select>
                  </div>
                  <div>
                    {formik.errors.city && formik.touched.city ? (
                      <p className="text-danger p-0 m-0">
                        {formik.errors.city}
                      </p>
                    ) : (
                      <span className=" opacity-0">. </span>
                    )}
                  </div>
                </div>

                <div
                  className={`form-group position-relative input-component w-50 `}
                >
                  <div className="position-relative">
                    <label
                      htmlFor="country"
                      className={`position-absolute bg-white ${styles.label}`}
                    >
                      Country
                    </label>
                    <select
                      name="country"
                      id="country"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.country}
                      onBlur={formik.handleBlur}
                    >
                      <option value=""></option>
                      <option value="Egypt">Egypt</option>
                    </select>
                  </div>
                  <div>
                    {formik.errors.country && formik.touched.country ? (
                      <p className="text-danger p-0 m-0">
                        {formik.errors.country}
                      </p>
                    ) : (
                      <span className=" opacity-0">. </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="category"
                    className={`bg-white ${styles.label}`}
                  >
                    Category
                  </label>

                  <select
                    name="category"
                    id="category"
                    className="form-select"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                  >
                    <option value=""></option>
                    <option value="Programming">Programming</option>
                    <option value="Health Care">Health Care</option>
                    <option value="Finance">Finance</option>
                    <option value="Accounting">Accounting</option>
                  </select>
                </div>

                <div>
                  {formik.errors.category && formik.touched.category ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.category}
                    </span>
                  ) : (
                    <span className=" opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="form-group input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="experienceLevel"
                    className={`bg-white ${styles.label}`}
                  >
                    Experience Level
                  </label>

                  <select
                    name="experienceLevel"
                    id="experienceLevel"
                    className="form-select"
                    onChange={formik.handleChange}
                    value={formik.values.experienceLevel}
                    onBlur={formik.handleBlur}
                  >
                    <option value=""></option>
                    <option value="Fresh">Fresh</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  {formik.errors.experienceLevel &&
                  formik.touched.experienceLevel ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.experienceLevel}
                    </span>
                  ) : (
                    <span className=" opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="form-group input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="desiredJobType"
                    className={`bg-white ${styles.label}`}
                  >
                    Desired Job Type
                  </label>

                  <select
                    name="desiredJobType"
                    id="desiredJobType"
                    className="form-select"
                    onChange={formik.handleChange}
                    value={formik.values.desiredJobType}
                    onBlur={formik.handleBlur}
                  >
                    <option value=""></option>
                    <option value="None">None</option>
                    <option value="Internship">Internship</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  {formik.errors.desiredJobType &&
                  formik.touched.desiredJobType ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.desiredJobType}
                    </span>
                  ) : (
                    <span className=" opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="form-group input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="qualifications"
                    className={`bg-white ${styles.label}`}
                  >
                    Qualifications
                  </label>

                  <select
                    name="qualifications"
                    id="qualifications"
                    className="form-select"
                    onChange={formik.handleChange}
                    value={formik.values.qualifications}
                    onBlur={formik.handleBlur}
                  >
                    <option value=""></option>
                    <option value="None">None</option>
                    <option value="Bachelors Degree">Bachelors Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                  </select>
                </div>

                <div>
                  {formik.errors.qualifications &&
                  formik.touched.qualifications ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.qualifications}
                    </span>
                  ) : (
                    <span className=" opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="form-group input-component mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="muliSkills"
                    className={`position-absolute bg-white ${styles.label}`}
                  >
                    Enter Your Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    id="muliSkills"
                    className="mt-4 form-control"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                <div>
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="badge  m-2 p-2 bg-body-secondary text-secondary-emphasis rounded-2"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill} &times;
                    </span>
                  ))}
                </div>
                <div>
                  {formik.errors.skills && formik.touched.skills ? (
                    <span className="text-danger p-0 m-0">
                      {formik.errors.skills}
                    </span>
                  ) : (
                    <span className=" opacity-0">. </span>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline-success m-auto mb-3 mt-3 w-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-success m-auto mb-3 mt-3 ms-2 w-50"
                >
                  Create Account
                </button>
              </div>
            </form>
            <p className="d-flex ">
              Already have an account?
              <NavLink
                to="/signin"
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
            <NavLink
              to="/companyRegister"
              className=" text-decoration-none text-center btn-outline-success border border-1 border-success rounded-2 p-2 m-2"
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
