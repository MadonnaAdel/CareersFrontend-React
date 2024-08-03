import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  ProgressBar,
} from "react-bootstrap";
import JobSeekerSidebar from "../JobSeekerSidebar";
import styles from "./Dashboard.module.css";
import { UilFileCheckAlt } from "@iconscout/react-unicons";
import { UilEye } from "@iconscout/react-unicons";
import { UilBookmark } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../store/Slices/FetchJobsSlice";
import JobCard from "../JobCard";
import JobInfoCard from "../JobInfoCard";
import JobTrackingChart from "../JobSeekerChart1";
import JobTrackingCircleChart from "../JobTrackingCircleChart";
import { countAppliedJobsByUser } from "../../store/Slices/AppliedJobsSlice";
import { countSavedJobsByUser } from "../../store/Slices/savedJobsSlice";

export default function Dashboard() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const appliedJobs = useSelector((state) => state.appliedJobs.appliedJobs);
  const savedJobs = useSelector((state) => state.appliedJobs.appliedJobs);

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    dispatch(getAllJobs());

    const fetchAppliedJobsLength = async () => {
      const { payload } = await dispatch(countAppliedJobsByUser({ userId }));
      setAppliedJobsCount(payload); // Set the state with the fetched payload
      console.log();
    };

    fetchAppliedJobsLength();


    const fetchSavedJobsLength = async () => {
      const { payload } = await dispatch(countSavedJobsByUser({ userId }));
      setSavedJobsCount(payload); // Set the state with the fetched payload
    };

    fetchSavedJobsLength();


  }, [dispatch, userId]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 991.98);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const iconSize = isSmallScreen ? 50 : 70; // Set icon size based on screen width

  if (!jobs) return <p>Loading...</p>;
  if (!appliedJobs) return <p>Loading...</p>;

  return (
    <Container fluid>
      <Row>
      
        <Col md={12}>
          <h4 className="mt-4 mb-5">Dashboard</h4>
          <Container>
            <Row className="my-4">
              <Col md={4}>
                <Card className={`${styles.card}`}>
                  <Card.Body
                    className={`d-flex justify-content-between align-items-center p-4 cl ${styles.cardBody}`}
                  >
                    <div>
                      <UilFileCheckAlt size={iconSize} color="#01A84D" />
                    </div>
                    <div>
                      <Card.Title style={{ fontSize: "2rem" }}>{appliedJobsCount}</Card.Title>
                      <Card.Text
                        style={{ fontSize: "1rem", fontWeight: "500" }}
                        className="display-4"
                      >
                        Applied jobs
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={`${styles.card}`}>
                  <Card.Body
                    className={`d-flex justify-content-between align-items-center p-4 cl ${styles.cardBody}`}
                  >
                    <div>
                      <UilEye size={iconSize} color="#01A84D" />
                    </div>
                    <div>
                      <Card.Title style={{ fontSize: "2rem" }}>14</Card.Title>
                      <Card.Text
                        style={{ fontSize: "1rem", fontWeight: "500" }}
                        className="display-4"
                      >
                        Profile Views
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={`${styles.card}`}>
                  <Card.Body
                    className={`d-flex justify-content-between align-items-center p-4 cl ${styles.cardBody}`}
                  >
                    <div>
                      <UilBookmark size={iconSize} color="#01A84D" />
                    </div>
                    <div>
                      <Card.Title style={{ fontSize: "2rem" }}>{savedJobsCount}</Card.Title>
                      <Card.Text
                        style={{ fontSize: "1rem", fontWeight: "500" }}
                        className="display-4"
                      >
                        Saved jobs
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={8}>
                <Card>
                  <Card.Header>JobTracking</Card.Header>
                  <Card.Body>
                    <JobTrackingChart></JobTrackingChart>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Header>JobTracking</Card.Header>
                  <Card.Body>
                    <JobTrackingCircleChart></JobTrackingCircleChart>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
