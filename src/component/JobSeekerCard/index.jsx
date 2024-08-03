import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobSeekerCard.module.css";
import Skills from "../Skills";
import "bootstrap/dist/css/bootstrap.min.css";

const JobSeekerCard = ({ candidate }) => {
  const navigate = useNavigate();
  const [displayedSkills, setDisplayedSkills] = useState([]);

  const handleViewProfile = () => {
    navigate(`/profile/${candidate._id}`);
  };

  useEffect(() => {
    if (Array.isArray(candidate.skills)) {
      const Skills = candidate.skills.slice(0, 3);
      setDisplayedSkills(Skills);
    }
  }, [candidate.skills]);

  return (
    <div
      className={`${styles.jobSeekerContainer} d-flex justify-content-center align-items-center flex-column m-0 `}
    >
      <div className={`${styles.contentContainer}`}>
        <div>
          <div
            className={`${styles.imageContainer} d-flex justify-content-center`}
          >
            <img
              className={styles.circularImage}
              src={candidate.profilePhoto ||  "../../assets/images/userAvtar.svg"}
              alt="Profile Avatar"
              width='100%'
              height='100%'
            />
          </div>
          <div className="text-center">
            <h5 className={`m-0 ${styles.name}`}>
              {candidate.firstName} {candidate.lastName}
            </h5>
            <p className={`${styles.jobTitle}`}>{candidate.category}</p>
          </div>
          <div className={`${styles.locationContainer} d-flex justify-content-center align-items-center py-2  rounded-2 text-center`}>
            <img src="location.svg" alt="Location Icon" />
            <span className={`ms-1  ${styles.locationText}`}>
              {candidate.country}, {candidate.city}
            </span>
          </div>
          <hr className={styles.separator} />
          <div className={styles.skillsContainer}>
            <div className="d-flex justify-content-start m-2 align-items-center flex-wrap">
              {displayedSkills.map((skill, index) => (
                <Skills key={index} name={skill} />
              ))}
              {candidate?.skills?.length > 3 && <Skills name={`+${candidate.skills.length - 3}`} />}
            </div>
          </div>
          <button
            className={`btn ${styles.viewProfileButton} mt-auto`}
            onClick={handleViewProfile}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerCard;
