import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, NavDropdown, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; 
import { useTranslation } from 'react-i18next';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../store/Slices/usersSlice";
import styles from "./Navbar.module.css";
import PopUp from "../PopUp";
import imge from "../../assets/images/logOut.svg";
import { UilGlobe } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilMessage } from '@iconscout/react-unicons'
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
          <Navbar.Brand as={Link} to="/Home" className={`${styles.resNav}`}>
            <img
              src={
                logo
              }
              width="100%"
              className="d-inline-block align-top"
              alt="Careers logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto px-3 py-2">
              <Link
                to="/home"
                className="nav-link text-success "
                activeClassName="active"
              >
                {t("Home")}
              </Link>
              <Link to="/jobs" className="nav-link" activeClassName="active">
                {t("Find jobs")}
              </Link>
            
              <Link
                to="/candidates"
                className="nav-link"
                activeClassName="active"
              >
                {t("Candidates")}
              </Link>
              <Link
                to="/companies"
                className="nav-link"
                activeClassName="active"
              >
                {t("Companies")}
              </Link>
              {isLoggedIn ? (
                <Link
                  to="/dashboard/dashboard-info"
                  className="nav-link"
                  activeClassName="active"
                >
                  {t("Dashboard")}
                </Link>
              ) : (
                ""
              )}

              <Link to="/aboutus" className="nav-link" activeClassName="active">
                {t("About Us")}
              </Link>
              <Link
                to="/contact"
                className="nav-link"
                activeClassName="active"
              >
                {t("Contact")}
              </Link>
              {
                isLoggedIn && 
                <><Link
                to="/contact"
                className="nav-link"
                activeClassName="active"
              >
                <UilBell/>
              </Link>
              <Link
                to="/contact"
                className="nav-link"
                style={{ paddingRight: "1rem" }}
                activeClassName="active"
              >
                <UilMessage/>
                  </Link>
                  </>
              }
              
              {isLoggedIn ? (
                <>
                  <NavDropdown
                    style={{}}
                    title={
                      <div className="d-flex align-items-center ">
                        <Image
                          src={
                           User?.profilePhoto ? User?.profilePhoto : img
                          }
                          roundedCircle
                          width="40"
                          className="me-3"
                        />

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
                    <Link
                      to={`/my-account/${User?._id}`}
                      className="ms-3 text-secondary"
                    >
                       <UilUser/> {t("My Account")}
                    </Link>
                    <Link onClick={handleShow} className="ms-3 text-secondary py-2">
                       <UilSignout/> {t("Logout")}
                    </Link>
                    <Link to={`/dashboard/settings`} className="ms-3 text-secondary">
                     <UilSetting/> {t("Settings")}
                    </Link>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link
                    to="/signUp"
                    className="nav-link"
                    style={{
                      color: "#01A84D",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    {t("Register")}
                  </Link>
                  <Link
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
                  </Link>
                </>
              )}
              <NavDropdown title={<UilGlobe size={26} className=' text-secondary ' color="var(--Forth)"  />} id="language-dropdown">
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
            <img src={imge} alt="" width="60%" height="60%"/>
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
