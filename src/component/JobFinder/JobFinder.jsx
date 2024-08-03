import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './JobFinder.module.css';
import { FaCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const JobFinder = () => {
   const navigate = useNavigate();
  const { t,i18n } = useTranslation();
  const handleClick = () => {
    navigate("/jobs");
  };
  return (
    <Container
      className={styles.container}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Row className={styles.row}>
        <Col md={6} className={styles.imageCol}>
          <img src="work.JPG" alt="Job Search" className={styles.image} />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1 className={styles.header}>
            {t("Millions of Jobs. Find the one that suits you.")}
          </h1>
          <p className={styles.description}>
            {t(
              "Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide."
            )}
          </p>
          <ul className={styles.features}>
            <li>
              <FaCheck className={styles.checkIcon} />{" "}
              {t("Bring to the table win-win survival")}
            </li>
            <li>
              <FaCheck className={styles.checkIcon} />{" "}
              {t("Capitalize on low hanging fruit to identify")}
            </li>
            <li>
              <FaCheck className={styles.checkIcon} />{" "}
              {t("But I must explain to you how all this")}
            </li>
          </ul>
          <Button
            variant="success"
            className={styles.button}
            onClick={handleClick}
          >
            {t("Get Started")}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default JobFinder;
