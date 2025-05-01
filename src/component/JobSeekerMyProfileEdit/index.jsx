import React, { useEffect, useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./JobSeekerMyProfileEdit.module.css";
import { useDispatch } from "react-redux";
import {
  fetchUserById,
  fetchUsers,
  updateUser,
} from "../../store/Slices/usersSlice";
import { toast } from "react-toastify";

const JobSeekerMyProfileEdit = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    overview: "",
    email: "",
    phone: "",
    category: "",
    experienceLevel: "",
    desiredJobType: "",
    qualifications: "",
    country: "",
    city: "",
    completeAddress: "",
    skills: selectedSkills,
    profilePhoto: "../../assets/images/userAvtar.svg",
    socialMedia: {
      facebook: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const { payload } = await dispatch(fetchUserById(userId));
      setUser({ ...payload, socialMedia: payload.socialMedia });
    };

    dispatch(fetchUsers());
    getUser();
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        overview: user.overview || "",
        email: user.email || "",
        phone: user.phone || "",
        category: user.category || "",
        experienceLevel: user.experienceLevel || "",
        desiredJobType: user.desiredJobType || "",
        skills: user.skills || [],
        qualifications: user.qualifications || "",
        socialMedia: {
          facebook: user.socialMedia?.facebook || "",
          linkedin: user.socialMedia?.linkedin || "",
        },
        country: user.country || "",
        city: user.city || "",
        completeAddress: user.completeAddress || "",
        profilePhoto: user.profilePhoto || "../../assets/images/userAvtar.svg",
      });
      setSelectedSkills(user.skills || []);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "facebook" || name === "linkedin") {
      setFormData((prevData) => ({
        ...prevData,
        socialMedia: {
          ...prevData.socialMedia,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => {
        const newFormData = {
          ...prev,
          profilePhoto: file,
        };
        return newFormData;
      });
    }
  };

  const handleSaveChanges = async () => {
    const updatedUser = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "profilePhoto") {
        if (formData.profilePhoto instanceof File) {
          updatedUser.append("profilePhoto", formData.profilePhoto);
        }
      } else if (key === "socialMedia") {
        updatedUser.append(
          "socialMedia",
          JSON.stringify({
            facebook: formData.socialMedia.facebook,
            linkedin: formData.socialMedia.linkedin,
          })
        );
      } else if (key === "skills") {
        selectedSkills.forEach((skill) =>
          updatedUser.append("skills[]", skill)
        );
      } else {
        updatedUser.append(key, formData[key]);
      }
    });

    const res = await dispatch(updateUser({ userId: user._id, updatedUser }));

    if (res.payload) {
      toast.success(`your profile has been updated successfully`);
    } else {
      toast.error("Error saving changes. Please try again.");
    }
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

  return (
    <Container fluid>
      <h4 className="mt-4 mb-5">My Profile</h4>
      <div className=" shadow-lg rounded-3 p-4 mt-5 mb-5 ">
        <Form className={`${styles.formContainer}`}>
          <Form.Label
            className={` bg-white ${styles.inputLabel}`}
            column
            sm={2}
          >
            Upload Profile Photo
          </Form.Label>
          <Form.Control
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
          />
          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              First Name
            </Form.Label>
            <Col>
              <Form.Control
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.firstName
                    ? "Enter your first name"
                    : formData.firstName
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Last Name
            </Form.Label>
            <Col>
              <Form.Control
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.lastName
                    ? "Enter your last name"
                    : formData.lastName
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Overview
            </Form.Label>
            <Col>
              <Form.Control
                as="textarea"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                className={`${styles.jobSeekerInput} `}
                placeholder={
                  !formData.overview ? "Tell us about you" : formData.overview
                }
              />
            </Col>
          </Form.Group>

          <div className="form-group input-component mt-4">
            <label htmlFor="multiSkills" className="">
              Enter Your Skills
            </label>
            <input
              type="text"
              name="skills"
              id="multiSkills"
              className="mt-3 form-control"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <div>
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="badge m-2 p-2 bg-body-secondary text-secondary-emphasis rounded-2"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  {skill} &times;
                </span>
              ))}
            </div>
          </div>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Email Address
            </Form.Label>
            <Col>
              <Form.Control
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Phone
            </Form.Label>
            <Col>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.phone ? "Enter your phone number" : formData.phone
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Category
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.category ? "Select category" : formData.category
                }
              >
                <option>Programming</option>
                <option>Health Care</option>
                <option>Finance</option>
                <option>Accounting</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Experience Level
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.experienceLevel
                    ? "Select Experience Level"
                    : formData.experienceLevel
                }
              >
                <option>Junior</option>
                <option>Mid Level</option>
                <option>Senior</option>
                <option>Fresh</option>
                <option>Expert</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Desired Job Type
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                name="desiredJobType"
                value={formData.desiredJobType}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.desiredJobType
                    ? "Select Desired Job Type"
                    : formData.desiredJobType
                }
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Freelance</option>
                <option>Other</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Qualifications
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.qualifications
                    ? "Select Qualifications"
                    : formData.qualifications
                }
              >
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>Doctoral Degree</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <h5 className="mt-4 mb-4">Social Media</h5>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Facebook
            </Form.Label>
            <Col>
              <Form.Control
                name="facebook"
                value={formData?.facebook}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder="Enter your Facebook profile link"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Linkedin
            </Form.Label>
            <Col>
              <Form.Control
                name="linkedin"
                value={formData?.linkedin}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={"Enter your linkedin profile link"}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Country
            </Form.Label>
            <Col>
              <Form.Control
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.country
                    ? "Enter your country name"
                    : formData.country
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              City
            </Form.Label>
            <Col>
              <Form.Control
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.city ? "Enter your city name" : formData.city
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <Form.Label
              className={` bg-white ${styles.inputLabel}`}
              column
              sm={2}
            >
              Complete Address
            </Form.Label>
            <Col>
              <Form.Control
                name="completeAddress"
                value={formData.completeAddress}
                onChange={handleChange}
                className={`${styles.jobSeekerInput}`}
                placeholder={
                  !formData.completeAddress
                    ? "Enter your complete address"
                    : formData.completeAddress
                }
              />
            </Col>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button onClick={handleSaveChanges} variant="success">
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default JobSeekerMyProfileEdit;
