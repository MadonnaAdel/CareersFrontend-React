import React, { useEffect } from 'react';
import { Table, Badge, Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobsByJobSeeker } from '../../store/Slices/AppliedJobsSlice';
import JobSeekerSidebar from '../JobSeekerSidebar';
import JobInfoCard from '../JobInfoCard';
import styles from '../JobCard/JobCard.module.css';
import { UilEllipsisV } from '@iconscout/react-unicons';
import './AppliedJobs.css';

const AppliedJobs = () => {
  const appliedJobs = useSelector((state) => state.appliedJobs.appliedJobs);
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    dispatch(fetchAppliedJobsByJobSeeker({ userId }));
  }, [userId, dispatch]);

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    } else if (diffMonths > 0) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return 'Today';
    }
  };

  return (
    <Container fluid>

          <h4 className="mt-4 mb-5">Applied Jobs</h4>
          <div style={{ border: '1px solid #B4E0D3', borderRadius: '16px', overflow: 'auto' }}>
            <Table className="w-100" striped hover>
              <thead>
                <tr className="p-3">
                  <th className="headBg headBorderRaduis1JobTitle">Job Title</th>
                  <th className="headBg">Applicants</th>
                  <th style={{ width: '20%' }} className="headBg">Date Applied</th>
                  <th className="headBg">Tracking</th>
                  <th className="headBg">Status</th>
                  <th className="headBg headBorderRaduisActions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job) => {
                  const jobLocation = job.jobId.jobLocation && job.jobId.jobLocation.length > 0 ? job.jobId.jobLocation[0] : {};
                  return (
                    <tr key={job._id}>
                      <td style={{ backgroundColor: '#FFFFFF' }}>
                        <div>
                          <strong>{job.jobId.JobTitle}</strong>
                          <div className="d-flex">
                            <img src="/clock.svg" alt="Clock Icon" />
                            <p className={`m-0 ${styles.subtext}`}>{formatRelativeDate(job.jobId.timeStamp)}</p>
                          </div>
                          <div className="d-flex mt-1" style={{ marginTop: '1rem' }}>
                            <JobInfoCard img="/office bag.svg" text={job.jobId.JobType} backgroundColor="var(--border02)" />
                            <JobInfoCard img="/Building.svg" text={job.jobId.JoblocationType} />
                            <JobInfoCard img="/location2.svg" text={`${jobLocation.State}, ${jobLocation.government}`} />
                          </div>
                        </div>
                      </td>
                      <td style={{ backgroundColor: '#FFFFFF' }}>200</td>
                      <td style={{ backgroundColor: '#FFFFFF' }}>{formatDate(job.timeStamp)}</td>
                      <td style={{ backgroundColor: '#FFFFFF' }}>{job.appliedJobStatus}</td>
                      <td style={{ backgroundColor: '#FFFFFF' }}>{job.jobId.status}</td>
                      <td style={{ backgroundColor: '#FFFFFF' }}>
                        <Dropdown>
                          <Dropdown.Toggle as={Button} variant="link" className="p-0">
                            <UilEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => console.log('Show Job Details')}>Show Job Details</Dropdown.Item>
                            <Dropdown.Item onClick={() => console.log('Edit Job Application')}>Edit Job Application</Dropdown.Item>
                            <Dropdown.Item onClick={() => console.log('Withdraw Application')}>Withdraw Application</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
    </Container>
  );
};

export default AppliedJobs;
