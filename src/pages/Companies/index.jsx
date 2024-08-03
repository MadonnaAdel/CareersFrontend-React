import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import CompayCard from "../../component/companyCard/index";
import { useDispatch, useSelector } from "react-redux";
import JobSeekersFilter from "../../component/JobSeekersFilter";
import styles from "./Companies.module.css";
import { Link } from "react-router-dom";
import imgSearchResult from '../../assets/images/noResults.svg';
import PopUp from "../../component/PopUp";
import { getAllCompanies } from "../../store/Slices/companiesSlice";
import CompanyCard from "../../component/companyCard/index";
import CompaniesFilter from "../../component/companiesFilter";

const Companies = () => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 12;

  useEffect(() => {
    dispatch(getAllCompanies());
  
  }, [dispatch]);

  useEffect(() => {
    setFilteredCompanies(companies);
    setLoading(false); 
  }, [companies]);

  const handleFilter = (filteredCompanies) => {
    setFilteredCompanies(filteredCompanies);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    if (value === '') {
      setFilteredCompanies(companies);
    } else {
      const searchResult = filteredCompanies.filter(candidate =>
        candidate.firstName.toLowerCase().includes(value) ||
        candidate.lastName.toLowerCase().includes(value)
      );
      setFilteredCompanies(searchResult);
    }
    setCurrentPage(1);
  };

  const indexOfLastCandidate = currentPage * companiesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - companiesPerPage;
  const currentcompanies = filteredCompanies.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  const handleClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  console.log(companies);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "240px",
          marginBottom: "2rem",
        }}
        className={`${styles.HeadBg} d-flex justify-content-center align-items-center flex-column`}
      >
        <h4>Browse Companies</h4>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/Home">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Companies</li>
          </ol>
        </nav>
        <div className={styles.InputContainer}>
          <input
            type="text"
            name="text"
            className={styles.input}
            id="input"
            placeholder="Search"
            onChange={handleSearch}
          />
          <label htmlFor="input" className="labelforsearch">
            <svg viewBox="0 0 512 512" className={styles.searchIcon}>
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </label>
        </div>
      </div>
      <Container>
        <Row>
           {/* <Col md={3}>
            <Button
              variant="success"
              className={styles.filterButton}
              onClick={handleShow}
            >
              Filter
            </Button>
            <div className={styles.filter}>
              <CompaniesFilter
                companies={companies}
                onFilter={handleFilter}
              />
            </div>
          </Col> */}
          <Col md={12}>
            <Row>
              <p>All {filteredCompanies.length} Companies found</p>
              {loading ? (
                <Row>
                  {[...Array(6)].map((_, index) => (
                    <Col
                      key={index}
                      className={`d-flex align-items-center justify-content-center ${index % 3 === 1 ? 'mx-5' : ''}`}
                      md={4}
                    >
                          <div class={styles.wrapper}>
                            <div class={styles.circle}></div>
                            <div className={styles.line1}></div>
                            <div className={styles.line2}></div>
                            <div className={styles.line3}></div>
                            <div className={styles.line4}></div>
                          </div>
                        
                    </Col>
                  ))}
                </Row>
              ) : (
                filteredCompanies.length > 0 ? (
                  currentcompanies.map((company, index) => (
                    <Col
                      key={index}
                      md={6}
                      lg={3}
                      className="d-flex align-items-center justify-content-center flex-wrap"
                    >
                      <CompanyCard company={company} />
                    </Col>
                  ))
                ) : (
                  <div>
                    <div className="imgSearchResult m-auto w-50">
                      <img src={imgSearchResult} alt="No Results" width='100%' />
                    </div>
                    <h5 className="text-center text-secondary">No results found</h5>
                  </div>
                )
              )}
            </Row>
            <div className="pagination">
              <a
                href="#"
                onClick={() => handleClick(currentPage - 1)}
                className="prev"
                style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
              >
                &lt;
              </a>
              {[...Array(totalPages)].map((_, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => handleClick(index + 1)}
                  className={`page ${index + 1 === currentPage ? "active" : ""}`}
                >
                  {index + 1}
                </a>
              ))}
              <a
                href="#"
                onClick={() => handleClick(currentPage + 1)}
                className="next"
                style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
              >
                &gt;
              </a>
            </div>
          </Col>
        </Row>
      </Container>
   
            {/* <PopUp show={show} handleClose={handleClose} body={
       <CompaniesFilter companies={companies} onFilter={handleFilter} />
      } /> */}
    </>
  );
};

export default Companies;
