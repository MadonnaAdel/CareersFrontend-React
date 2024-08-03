import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import JobSeekerSidebar from "../JobSeekerSidebar";
import styles from "./Setting.module.css";
import { changePassword } from "../../store/Slices/usersSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Setting = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.users);

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("The old password is required"),
    newPassword: Yup.string()
      .required("The password is required")
      .min(8, "Minimum length should be 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("The confirm password is required")
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(changePassword(values));
    },
  });

  return (
    <Container fluid>
    

          <h4 className="mt-4 mb-5">Setting</h4>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form className={`${styles.formContainer}`} onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4 position-relative">
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
                Old Password
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  name="oldPassword"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.jobSeekerInput}`}
                  placeholder="Enter Old Password"
                  type="password"
                  isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.oldPassword}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
                New Password
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.jobSeekerInput} ${styles.inputField}`}
                  placeholder="Enter New Password"
                  type="password"
                  isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.newPassword}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="mb-4 position-relative">
              <Form.Label className={`position-absolute bg-white ${styles.inputLabel}`} column sm={2}>
                Confirm Password
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.jobSeekerInput} ${styles.inputField}`}
                  placeholder="Confirm Password"
                  type="password"
                  isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Form>
       
    </Container>
  );
};

export default Setting;
