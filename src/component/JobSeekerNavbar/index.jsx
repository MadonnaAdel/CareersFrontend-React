import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, NavDropdown, Col, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/authContext";
import { useDispatch } from "react-redux";
import { fetchUserById } from "../../store/Slices/usersSlice";
import styles from "./Navbar.module.css";
import PopUp from "../PopUp";
import imge from "../../assets/images/logOut.svg";
import { UilGlobe } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'
import { UilSetting } from '@iconscout/react-unicons'
import logo from '../../assets/images/logo.png'
import img from "../../assets/images/userAvtar.svg"
const JobSeekerNavbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const dispatch = useDispatch();
  const navgate = useNavigate();
  const { t, i18n } = useTranslation();
  const [User, setUser] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const User = await dispatch(fetchUserById(userId));
          setUser(User.payload);
        }
      }
    };
    fetchUserData();
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          position: "sticky",
          zIndex: "99",
          backgroundColor:"white",
          top: '0',
          padding:'0',
          boxShadow: "0 0px 16px rgba(0,0,0,0.1)",
        }}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={`${styles.navBarRes}`}
      >
        <div className={`${styles.container} container`}>
          <Navbar.Brand as={NavLink} to="/Home" className={`${styles.resNav}`}>
            <img
              src={
                logo
              }
              width="100%"
              className="d-inline-block align-top "
              alt="Careers logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav " />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end "
          >
            <Nav className="ml-auto px-3 py-2 d-flex align-items-center">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {t("Home")}
              </NavLink>
              <NavLink to="/jobs" className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
                {t("Find jobs")}
              </NavLink>

              <NavLink
                to="/candidates"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {t("Candidates")}
              </NavLink>

              {isLoggedIn ? (
                <NavLink
                  to="/dashboard/dashboard-info"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {t("Dashboard")}
                </NavLink>
              ) : (
                ""
              )}

              <NavLink to="/aboutus" className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
                {t("About Us")}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {t("Contact")}
              </NavLink>


              {isLoggedIn ? (
                <>
                  <NavDropdown
                    style={{}}
                    title={
                      <div className="d-flex align-items-center ">
                        <div className=" overflow-hidden rounded-circle me-3 border border-1 border-success" style={{ width: "40px", height: "40px" }}>
                          <Image
                            src={
                              User?.profilePhoto
                            }
                            roundedCircle
                            onError={(e) => {
                              e.target.src = img;
                            }}
                            width="100%"
                            height={"100%"}
                            className="d-inline-block align-top "
                          />
                        </div>


                        <Col
                          className="applicantInfo"
                          style={{ fontSize: "10px" }}
                          xs={3}
                        >
                          <h6 className="applicantName">
                            {User?.firstName || User?.lastName ? `${User.firstName} ${User.lastName}` : 'user'}
                          </h6>

                          <span className="salery text-green ">
                            {t("Your Profile")}
                          </span>
                        </Col>
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >
                    <NavLink
                      to={`/my-account/${User?._id}`}
                      className="ms-3 text-secondary"
                    >
                      <UilUser /> {t("My Account")}
                    </NavLink>

                    <NavLink to={`/dashboard/settings`} className="ms-3 text-secondary py-2 ">
                      <UilSetting /> {t("Settings")}
                    </NavLink>


                    <NavLink onClick={handleShow} className="ms-3 text-secondary text-danger">
                      <UilSignout /> {t("Logout")}
                    </NavLink>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signUp"
                    className="nav-link"
                    style={{
                      color: "#01A84D",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    {t("Register")}
                  </NavLink>
                  <NavLink
                    to="/login"
                    variant="success"
                    className="nav-link"
                    style={{
                      color: "#01A84D",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    {t("Sign In")}
                  </NavLink>
                </>
              )}
              <NavDropdown title={<UilGlobe size={26} className=' text-secondary ' color="var(--Forth)" />} id="language-dropdown">
                <NavDropdown.Item onClick={() => changeLanguage("en")}>
                  English
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage("ar")}>
                  عربي
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <PopUp
        show={show}
        handleClose={handleClose}
        body={
          <>
            <img src={imge} alt="" width="60%" height="60%" />
            <p className="fw-bold text-capitalize">You will log out. Are you sure?</p>
            <div className="d-flex justify-content-center align-items-center my-4">
              <Button
                className="btn btn-outline-success bg-white text-success me-3"
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                className="btn btn-success"
                onClick={() => {
                  logout();
                  navgate("/Home");
                  handleClose();
                }}
              >
                Yes
              </Button>
            </div>
          </>
        }
      />
    </>
  );
};

export default JobSeekerNavbar;
