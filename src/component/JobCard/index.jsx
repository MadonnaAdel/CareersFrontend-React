import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation hook
import { UilBookmark } from '@iconscout/react-unicons';
import { UisBookmark } from '@iconscout/react-unicons-solid';
import { useDispatch, useSelector } from 'react-redux';
import { postSavedJob, deleteSavedJob, getSavedJobs } from '../../store/Slices/savedJobsSlice';
import JobInfoCard from '../JobInfoCard';
import styles from './JobCard.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import moment from 'moment';


const JobCard = ({ job, id, onRemove }) => {
  const dispatch = useDispatch();
  const userId = '6681e2ab75a50c5ecc4d8e02';
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (job && savedJobs.some((savedJob) => savedJob.jobId && savedJob.jobId._id === job._id)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [job, savedJobs]);

  const handleFavIcon = (jobId) => {
    const savedJob = savedJobs.find((savedJob) => savedJob.jobId && savedJob.jobId._id === jobId);

    if (savedJob) {
      dispatch(deleteSavedJob(savedJob._id))
        .then(() => {
          dispatch(getSavedJobs(userId)).then(() => {
            setIsFav(false);
            onRemove(jobId);
          });
        })
        .catch((error) => {
          console.error('Error deleting saved job:', error);
        });
    } else {
      dispatch(postSavedJob({ userId, jobId }))
        .then(() => {
          dispatch(getSavedJobs(userId))
            .then(() => {
              setIsFav(true);
            });
        })
        .catch((error) => {
          console.error('Error saving job:', error);
        });
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

  const formatJobTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  if (!job) return null;

  const jobLocation = job.jobLocation || {};

  // Condition to hide image based on path
  const shouldHideImage = location.pathname === '/savedjobs';

  return (
    <div className={`d-flex align-items-center ${styles.container}`}>
      <div className={styles.detailsContainer}>
        <div className={`d-flex align-items-center ${styles.padding2}`}>
          {!shouldHideImage && (
            <img
              src={job.companyId.companyLogo}
              alt="Employer Logo"
              className={styles.imgSize}
            />
          )}
          <div className={`d-flex flex-column ${styles.marginLeft}`}>
            <Link to={`/JobsDetails/${job._id}`} className={styles.titleLink}>
              <h5 className={`m-0 ${styles.title}`}>{job.JobTitle}</h5>
            </Link>
            <Link to="/company-profile " className='my-1'>{job?.companyId?.companyName }</Link>
            <div className="d-flex">
              <img src="/clock.svg" alt="Clock Icon" />
              <p className={`m-0 ${styles.subtext}`}>
                {/* {formatJobTimestamp(job.timeStamp)}
                 */}
                {moment(job.timeStamp).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div className={`d-flex ${styles.padding}`}>
          <JobInfoCard
            img="/office bag.svg"
            text={job.JobType}
            backgroundColor="var(--border02)"
          />
          <JobInfoCard img="/Building.svg" text={job.JoblocationType} />
          <JobInfoCard
            img="/location2.svg"
            text={`${jobLocation.State}, ${jobLocation.government}`}
          />
          <JobInfoCard
            img="/dollar coin.svg"
            text={job.salary && `${job.salary.from} : ${job.salary.to}`}
          />
        </div>
        <hr className={styles.separator} />
        <p className={styles.jobDescription}>
          {truncateDescription(job.description, 100)}
        </p>
      </div>
      <div className={styles.container2}>
        {isFav ? (
          <UisBookmark onClick={() => handleFavIcon(job._id)} />
        ) : (
          <UilBookmark onClick={() => handleFavIcon(job._id)} />
        )}
        <button
          className={`${styles.button} btn btn-success`}
          onClick={() => navigate(`/JobsDetails/${job._id}`)} // Navigate to details page
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
