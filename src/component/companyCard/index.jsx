import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./companyCard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobsByCompanyId } from "../../store/Slices/FetchJobsSlice";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const Jobs = useSelector((state) => state.jobs.jobs);
  const dispatch = useDispatch();

  const handleViewProfile = () => {
    navigate(`/CompanyProfile/${company._id}`);
  };

  useEffect(() => {
    dispatch(getAllJobsByCompanyId(company._id));
  }, [dispatch, company._id]);

  useEffect(() => {
    console.log('Jobs data in component:', Jobs); // تحقق من البيانات هنا
    if (Jobs) {
      setJobs(Jobs);
    }
  }, [Jobs]);

  console.log(company, 'this compo', jobs, company._id);

  return (
    <div className={`${styles.jobSeekerContainer} d-flex justify-content-center align-items-center flex-column m-0`}>
      <div className={`${styles.contentContainer}`}>
        <div>
          <div className={`${styles.imageContainer} d-flex justify-content-center`}>
            <img
              className={styles.circularImage}
              src={company.companyLogo || "../../assets/images/userAvtar.svg"}
              alt="Profile Avatar"
              width="100%"
              height="100%"
            />
          </div>
          <div className="text-center">
            <h5 className={`m-0 ${styles.name}`}>{company.companyName}</h5>
            <p className={`${styles.jobTitle}`}>{company.companyIndustry}</p>
          </div>
          <div className={`${styles.locationContainer} d-flex justify-content-center align-items-center py-2 rounded-2 text-center`}>
            <img src="location.svg" alt="Location Icon" />
            <span className={`ms-1 ${styles.locationText}`}>
              {company.state}, {company.city}
            </span>
          </div>
          <hr className={styles.separator} />
          <div className={styles.skillsContainer}>
            <div className="d-flex justify-content-start m-2 align-items-center flex-wrap">
              {/* يمكن إضافة المهارات هنا */}
            </div>
          </div>
          <button
            className={`btn ${styles.viewProfileButton} mt-auto`}
            onClick={handleViewProfile}
          >
            founded {jobs?.length || 0} Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
