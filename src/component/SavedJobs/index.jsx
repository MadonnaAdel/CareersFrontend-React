import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedJobs, deleteSavedJob } from '../../store/Slices/savedJobsSlice';
import { Container, Alert } from 'react-bootstrap';
import JobCard from '../JobCard';

const SavedJobs = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId')
    ;
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);
  const jobs = useSelector((state) => state.jobs.jobs);
  const [localSavedJobs, setLocalSavedJobs] = useState([]);


  useEffect(() => {
    dispatch(getSavedJobs(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setLocalSavedJobs(savedJobs);
  }, [savedJobs]);

  const handleRemoveJob = (jobId) => {
    const updatedJobs = localSavedJobs.filter(savedJob => savedJob.jobId && savedJob.jobId._id !== jobId);
    setLocalSavedJobs(updatedJobs);
    dispatch(getSavedJobs(userId));
  };

  return (
    <Container fluid>
              <h4 className='mt-4 mb-5'>Saved Jobs</h4>

      <div className=" shadow-lg rounded-3 p-4 mt-5 mb-5 ">
        {localSavedJobs.length === 0 ? (
          <Alert variant="info">No saved jobs</Alert>
        ) : (
          localSavedJobs.map((savedJob) => {
            if (!savedJob || !savedJob.jobId) {
              return null;
            }
            return (
              <JobCard
                key={savedJob._id}
                job={savedJob.jobId}
                id={savedJob.jobId._id}
                onRemove={handleRemoveJob}
              />
            );
          })
        )}
      </div>
    </Container>
  );
};

export default SavedJobs;
