import React from "react";
import { useTranslation } from 'react-i18next';
import styles from "./JobSeeker.module.css";
import { Col, Container, Row, Card } from "react-bootstrap";
import { UilBag, UilMapMarker, UilSearch } from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
const JobSeeker = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div
        className={styles.heroSection}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div
              className={`d-flex flex-column ${styles.headerContainer}  mt-5`}
            >
              <div className={` ${styles.headerText} `}>
                <h1>
                  {t("The")} <span className={styles.highlight}>#1</span>{" "}
                  {t("Job Board for")}
                  <br />
                  {t("Hiring or Find your next")}
                  <br />
                  {t("job in")}{" "}
                  <span className={styles.highlight}>{t("Egypt")}</span>
                </h1>
                <p className="mt-4">
                  {t(
                    "Each month, over 3 million job seekers rely on our website as a trusted resource in their quest for employment. These individuals come from diverse backgrounds and industries, all united by their common goal of finding meaningful work."
                  )}
                </p>
              </div>
              <div>
                <div className={styles.searchBar}>
                  <div className="d-flex">
                    <div>
                      <div className="d-flex justify-content-center align-items-center">
                        <UilBag size="16" color="#989DA6" />
                        <p className={`m-0 ${styles.searchPara}`}>
                          {t("Industry")}
                        </p>
                      </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className="d-flex justify-content-center align-items-center">
                      <UilMapMarker size="17" color="#989DA6" />
                      <p className={`m-0 ${styles.searchPara}`}>
                        {t("Location")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className={`${styles.searchButton} m-0`}>
                      {" "}
                      <UilSearch size="16" color="#FFFFFF" />
                      <Link to="/jobs">
                        <p className={`m-0 ${styles.search}`}>{t("Search")}</p>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.containerImage} mt-1`}>
              <img className="w-100" src="Card.svg" alt="Job Search" />
            </div>
          </div>
          <Row className="mt-5">
            <Col md={4} className="mb-3">
              <Card className={`${styles.myShadow} text-center`}>
                <Card.Body>
                  <Card.Title className={styles.cardTitle}>
                    {t("30k+")}
                  </Card.Title>
                  <Card.Text className={`${styles.cardText} m-1 p-0`}>
                    {t("Job Seeker")}
                  </Card.Text>
                  <Card.Text className={`${styles.cardBody} m-2 p-0`}>
                    {t(
                      "We always provide people a complete solution upon focused of any business."
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className={`${styles.myShadow} text-center`}>
                <Card.Body>
                  <Card.Title className={styles.cardTitle}>
                    {t("10k+")}
                  </Card.Title>
                  <Card.Text className={`${styles.cardText} m-1 p-0`}>
                    {t("Vacant jobs")}
                  </Card.Text>
                  <Card.Text className={`${styles.cardBody} m-2 p-0`}>
                    {t(
                      "We always provide people a complete solution upon focused of any business."
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className={`${styles.myShadow} text-center`}>
                <Card.Body>
                  <Card.Title className={styles.cardTitle}>
                    {t("20k+")}
                  </Card.Title>
                  <Card.Text className={`${styles.cardText} m-1 p-0`}>
                    {t("Company")}
                  </Card.Text>
                  <Card.Text className={`${styles.cardBody} m-2 p-0`}>
                    {t(
                      "We always provide people a complete solution upon focused of any business."
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default JobSeeker;
