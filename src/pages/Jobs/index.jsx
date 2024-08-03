import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../store/Slices/FetchJobsSlice";
import JobCard from "../../component/JobCard";
import JobsFilter from "../../component/JobsFilter";
import { Row, Col, Container, Button, Modal, InputGroup, Dropdown } from "react-bootstrap";
import styles from "./jobs.module.css"; // Import the CSS module
import { Form, Link } from "react-router-dom";
import PopUp from "../../component/PopUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import imgSearchResult from '../../assets/images/noResults.svg'
export default function Jobs() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const jobs = useSelector((state) => state.jobs.jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortedBy, setSortedBy] = useState(" Not sorted ");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleFilter = (filteredJobs) => {
    setFilteredJobs(filteredJobs);
    setCurrentPage(1);
  };
  const handelSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (value == '') {
      setFilteredJobs(jobs);
    } else {
      const searchResult = filteredJobs.filter(job => job.JobTitle.toLowerCase().includes(value))
        .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
      setFilteredJobs(searchResult);
    }
    setCurrentPage(1);
  };
  const handelSortByDate =()=> {
  const sortedFilteredJobs = [...filteredJobs].sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
   setFilteredJobs(sortedFilteredJobs);
   setCurrentPage(1);
    setSortedBy("Date Created");
  }

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleClick = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };
console.log(jobs);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "240px",

          marginBottom: "2rem",
        }}
        className={`${styles.HeadBg} d-flex justify-content-center align-items-center flex-column `}
      >
        <h4>Browse jobs</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/Home">Home</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Jobs</li>
          </ol>
        </nav>



        <div className={styles.InputContainer}>
          <input type="text"
            name="text"
            className={styles.input}
            id="input"
            placeholder="Search"
            onChange={handelSearch} />

          <label for="input" class="labelforsearch" >
            <svg viewBox="0 0 512 512"
              className={styles.searchIcon}>
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </label>
        </div>
      </div>
      <Container>
        <Row>
          <Col md={3}>
            <Button
              variant="success"
              className={`${styles.filterButton} `}
              onClick={handleShow}
            >
              Filter
            </Button>
            <div className={styles.filter}>
              <JobsFilter jobs={jobs} onFilter={handleFilter} />
            </div>
          </Col>
          <Col md={9}>
            <div className="d-flex justify-content-between align-items-center">
              <p>All {filteredJobs.length} candidates found</p>
              <div className="d-flex align-items-center">
                <p className="">Sorted By:</p>

                <div class="dropdown mb-3">
                  <button class="px-3 py-1 rounded-3 main-border ms-2 mb-1 dropdown-toggle text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {sortedBy}
                  </button>
                  <ul class="dropdown-menu">
                    <li><button class="dropdown-item" type="button" onClick={handelSortByDate}>Date Created</button></li>
                   
                  </ul>
                </div>
              </div>
            </div>
            <Row>
              {filteredJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <Col
                    className="col-12"
                    key={job._id}
                    style={{ marginBottom: "20px" }}
                  >
                    <JobCard job={job} />
                  </Col>
                ))
              ) : (
                // <>
                //   <div class={`${styles.loader} mb-5`}>
                //     <div class={styles.wrapper}>
                //       <div class={styles.circle}></div>
                //       <div className={styles.line1}></div>
                //       <div className={styles.line2}></div>
                //       <div className={styles.line3}></div>
                //       <div className={styles.line4}></div>
                //     </div>
                //   </div>
                //   <div class={styles.loader}>
                //     <div class={styles.wrapper}>
                //       <div class={styles.circle}></div>
                //       <div className={styles.line1}></div>
                //       <div className={styles.line2}></div>
                //       <div className={styles.line3}></div>
                //       <div className={styles.line4}></div>
                //     </div>
                //   </div>
                  // </>
                  <div>
                  <div className="imgSearchResult m-auto w-50">
                    <img src={imgSearchResult} alt="imgSearchResult" width='100%' />
                  </div>
                  <h5 className="text-center text-secondary">No results found </h5>
              </div>
              )}
            </Row>
            {filteredJobs.length > jobsPerPage && (
              <div className="pagination">
                <a
                  href="#"
                  onClick={(e) => handleClick(e, currentPage - 1)}
                  className="prev"
                  style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
                >
                  &lt;
                </a>
                {[...Array(totalPages)].map((_, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={(e) => handleClick(e, index + 1)}
                    className={`page ${index + 1 === currentPage ? "active" : ""
                      }`}
                  >
                    {index + 1}
                  </a>
                ))}
                <a
                  href="#"
                  onClick={(e) => handleClick(e, currentPage + 1)}
                  className="next"
                  style={{
                    pointerEvents: currentPage === totalPages ? "none" : "auto",
                  }}
                >
                  &gt;
                </a>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <PopUp show={show} handleClose={handleClose} body={
        <JobsFilter jobs={jobs} onFilter={handleFilter} />
      } />
    </>
  );
}
