import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Setting.module.css";
import { changePassword, deleteUser } from "../../store/Slices/usersSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import PopUp from "../PopUp";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import imge from "../../assets/images/deleteAccount.svg";
const Setting = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.users);
  const userId = localStorage.getItem("userId");
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [showDeleteAccComfirm, setShowDeleteAccComfirm] = useState(false);

  const handleClose = () => setShowDeleteAccComfirm(false);
  const handleShow = () => setShowDeleteAccComfirm(true);


  const deleteAccount = async (userId) => {
    try {
      if (userId) {
        const res = await dispatch(deleteUser(userId));
        if (res && res.payload) {
          navigate("/Home");
          logout();
          toast.success(`${res.payload.message} 😢, we will miss you come back soon`)
        } else {
          toast.error("Something went wrong")
        }

      }

    } catch (e) {
      console.error(e);
    }
  }

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
      <div className=" shadow-lg rounded-3 p-4 mt-5 mb-5 ">
        <Form className={`${styles.formContainer}`} onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-4 position-relative">
            <Form.Label className={` bg-white ${styles.inputLabel}`} column sm={2}>
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
            <Form.Label className={` bg-white ${styles.inputLabel}`} column sm={2}>
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
            <Form.Label className={` bg-white ${styles.inputLabel}`} column sm={2}>
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
          <span className="text-danger mb-4 pointer-event" onClick={handleShow}> Delete Account</span>

          <div className="d-flex justify-content-end mt-5">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>

      </div>

      <PopUp
        show={showDeleteAccComfirm}
        handleClose={handleClose}
        body={
          <>
            <img src={imge} alt="Delete Account image" width="60%" height="60%" />
            <div>You will <span className="text-danger fw-bold">Delete Your Account Premently</span>. Are you sure?</div>
            <div className="d-flex justify-content-center align-items-center my-4">
              <Button
                className="btn btn-outline-danger bg-white text-danger me-3"
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => deleteAccount(userId)}
              >
                Yes
              </Button>
            </div>
          </>
        }

      />
    </Container>
  );
};

export default Setting;
