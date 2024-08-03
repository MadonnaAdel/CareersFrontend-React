import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./JobSeekerMyProfileEdit.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, fetchUsers, updateUser } from "../../store/Slices/usersSlice";
import { toast } from "react-toastify";

const JobSeekerMyProfileEdit = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  
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
    facebook: "",
    linkedin: "",
    country: "",
    city: "",
    completeAddress: "",
    profilePhoto: "../../assets/images/userAvtar.svg",
  });

  useEffect(() => {
    const getUser = async () => {
      const { payload } = await dispatch(fetchUserById(userId));
      setUser(payload);
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
        qualifications: user.qualifications || "",
        facebook: user.facebook || "",
        linkedin: user.linkedin || "",
        country: user.country || "",
        city: user.city || "",
        completeAddress: user.completeAddress || "",
        profilePhoto: user.profilePhoto || "../../assets/images/userAvtar.svg" ,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  const handleSaveChanges = async() => {
     
    const updatedUser = new FormData();
    Object.keys(formData).forEach(key => {
      updatedUser.append(key, formData[key]);
    });

    await dispatch(updateUser({ userId: user._id, updatedUser }));
   toast.success("Your Changes Saved Successfully");
  };

  return (
    <Container fluid>
          <h4 className="mt-4 mb-5">My Profile</h4>
          <Form className={`${styles.formContainer}`}>
            <InputGroup className="mb-4">
              <Form.Control type="file" onChange={handleFileChange} />
              <Button variant="outline-secondary">Upload</Button>
            </InputGroup>

            <Form.Group className="mb-4 position-relative">
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
                First Name
              </Form.Label>
              <Col>
                <Form.Control
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${styles.jobSeekerInput}`}
                  placeholder={
                    !formData.firstName ? "Enter your first name" : formData.firstName
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
                Last Name
              </Form.Label>
              <Col>
                <Form.Control
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${styles.jobSeekerInput}`}
                  placeholder={
                    !formData.lastName ? "Enter your last name" : formData.lastName
                  }
                />
              </Col>
            </Form.Group>

           <Form.Group className="mb-4 position-relative">
  <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
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
        !formData.overview ? "Tell us about you" : formData.overview}
    />
  </Col>
</Form.Group>

        

            <Form.Group className="mb-4 position-relative">
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
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
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
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
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
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
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
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
                    !formData.experienceLevel ? "Select Experience Level" : formData.experienceLevel
                  }
                >
                  <option>Junior</option>
                  <option>Intern</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                  <option>Manager</option>
                  <option>Director</option>
                  <option>C-Level</option>
                  <option>Expert</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
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
                    !formData.desiredJobType ? "Select Desired Job Type" : formData.desiredJobType
                  }
                >
                  <option>Full Time </option>
                  <option>Part Time</option>
                  <option>Temporary</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
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
                    !formData.qualifications ? "Select Qualifications" : formData.qualifications
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
                className={`position-absolute bg-white ${styles.inputLabel}`}
                column
                sm={2}
              >
                Facebook
              </Form.Label>
              <Col>
                <Form.Control
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className={`${styles.jobSeekerInput}`}
                  placeholder={
                    !formData.facebook
                      ? "Enter your facebook profile link"
                      : formData.facebook
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <Form.Label
                className={`position-absolute bg-white ${styles.inputLabel}`}
                column
                sm={2}
              >
                Linkedin
              </Form.Label>
              <Col>
                <Form.Control
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className={`${styles.jobSeekerInput}`}
                  placeholder={
                    !formData.linkedin
                      ? "Enter your linkedin profile link"
                      : formData.linkedin
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <Form.Label
                className={`position-absolute bg-white ${styles.inputLabel}`}
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
                className={`position-absolute bg-white ${styles.inputLabel}`}
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
                className={`position-absolute bg-white ${styles.inputLabel}`}
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
 
    </Container>
  );
};

export default JobSeekerMyProfileEdit;
