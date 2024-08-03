import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs, getJobById } from './../../store/Slices/FetchJobsSlice';
import styles from './jobsDetails.module.css';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { applyForJob, deleteAppliedJob, fetchAppliedJobsByJobSeeker } from '../../store/Slices/AppliedJobsSlice';
import { toast } from 'react-toastify';
import Skills from '../../component/Skills/index';

import { UilMapMarker, UilBag, UilClock, UilUser, UilMapPinAlt, UilDollarAlt } from '@iconscout/react-unicons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import PopUp from '../../component/PopUp/index';
import congrats from '../../assets/images/you Applied.svg';
import JobSeekerProfileItem from '../../component/jobSeekerProfileItem';


const JobsDetails = () => {



  const { id } = useParams();
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const { jobs, job } = useSelector((state) => state.jobs);
  const appliedJobs = useSelector((state) => state.appliedJobs.appliedJobs);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [isApplied, setIsApplied] = useState(false);
  const [appliedJobId, setAppliedJobId] = useState(null);
  const [count, setCount] = useState(4);
  const navigate = useNavigate();
  const handleClose = () => { setShow(false); navigate('/jobs')};

  useEffect(() => {
    dispatch(getAllJobs())
    dispatch(getJobById(id));
    dispatch(fetchAppliedJobsByJobSeeker({ userId }));
  }, [dispatch, id, userId]);






  const handleApplyNow = async (jobId) => {
    const existingApplication = appliedJobs.find(
      (appliedJob) => appliedJob.jobId._id == id && appliedJob.userId == userId
    );

    if (existingApplication) {
      if (existingApplication.additionalFormSubmitted) {
        toast.info('You already submitted an additional form for this job.')
        return;
      } else {
        toast.info('You have already applied for this job.')
        return;
      }
    }

    if (job?.additionalJobForm) {
      navigate(`/applicationform/${jobId}`);
    }
    else {
      try {
        const resultAction = await dispatch(applyForJob({ userId, jobId })).unwrap();
        console.log("Applied job ID:", resultAction);

        await dispatch(fetchAppliedJobsByJobSeeker({ userId })).unwrap();
        setIsApplied(true);
        setAppliedJobId(resultAction);
        handleShow();
      } catch (error) {
        console.error("Failed to apply for job:", error.message);
        toast.error('Failed to apply for job.');
      }
    }

  };


  const handleDeleteApplication = async () => {
    try {
      await dispatch(deleteAppliedJob(appliedJobId)).unwrap();
      await dispatch(fetchAppliedJobsByJobSeeker({ userId })).unwrap();
      setIsApplied(false);
      setAppliedJobId(null);
      toast.info("You deleted Job application ")
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error(error.message || 'Failed to delete job application.')
    }
  };


  const handelShowMore = () => {
    if (jobs.length <= count) {
      toast.info('No More Jobs')
    }
    else {
      setCount(count + 2)
    }
  }

  return (
    <>
      <section>

        <div className={`${styles.headBage}`}>

        </div>

        <div className={styles.container}>

          <div className="row">

            <div className={`${styles.title} col-lg-8 col-md-8 col-sm-12`}>
              <div>
                <img
                  src={job?.companyId?.companyLogo}
                  alt="Employer Logo"
                  className={styles.imgSize}
                />
              </div>
              <div className={styles.content}>
                <h5 className={styles.jobTitle}>{job?.JobTitle}</h5>
                <Link to={`/company-profile/${job?.companyId?._id}`} className='my-2'>{job?.companyId?.companyName}</Link>
                <div className={`d-flex`}>
                  <img src="/clock.svg" alt="Clock Icon" />
                  <p className={`m-0 ${styles.subtext}`}>
                    {moment(job.timeStamp).fromNow()}
                  </p>
                </div>

              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 p-0 col-12">
              <div className={styles.btns}>
                {isApplied ? (
                  <button
                    onClick={handleDeleteApplication}
                    className={`${styles.applyBtn} btn border-1 rounded-2 py-2 px-4 bg-green text-white `}
                  >Delete Application</button>
                ) : (
                  <button
                    onClick={() => < >{handleApplyNow(job._id)}</>}

                    disabled={job.status != "Open"}
                    className={`${styles.applyBtn} btn border-1  rounded-2 py-2 px-5 bg-green text-white `}
                  >Apply Now</button>
                )}
                <button
                  className={`${styles.saveBtn}  btn main-border text-green  rounded-2 py-2 px-5 ms-2`}
                >Save Job</button>
              </div>
            </div>
          </div>
          <hr className={styles.breakLine}></hr>
          {job.status !== "Open" ? (<div className='bg-info-subtle p-3 rounded-2 w-75 border-1 border border-info text-secondary'>This position is currently closed. We are no longer accepting applications. Thank you for your interest.</div>) : ('')}
          <div className="row mt-5 ">
            <div className={`${styles.description} col-lg-8 col-md-7 col-sm-12 mx-auto p-4`}>
              <div>
                <p className={styles.par1}>Job Description</p>
                <p className={styles.par2}>{job.JobHours && <>Working hours from <span className='text-success  fw-bold'> {job?.JobHours?.from}</span> to <span className='text-success fw-bold'>{job?.JobHours?.to}</span> <br /></>}

                  {job?.description}</p>
              </div>
              <div>
                <p className={styles.par1}>Qualifications Requiremnt</p>

                <ul className={styles.list}>
                  {job.jobRequirements && job.jobRequirements.map((requirement, index) => (
                    <div className='d-flex justify-content-start align-items-center'>
                      <FontAwesomeIcon icon={faCircle} className={styles.icon} /><li key={index} className='ms-2'>{requirement}</li>
                    </div>
                  ))}
                </ul>



              </div>
              <div>
                <p className={styles.par1}>Required Skills:</p>
                <ul className={styles.skillsList}>
                  {job?.skills && job.skills.length > 0 ? (
                    job.skills.map((skill, index) => (
                      <Skills key={index} name={skill} />
                    ))
                  ) : (
                    <li>No  skills </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12  mx-auto ">
              <div className={`${styles.sideBar} p-4`}>
                <p className={styles.Requirements}>Requirements</p>
                <ul className={`p-0 `}>
                                  <li><JobSeekerProfileItem width='100%'  backgroundColor={'var(--border02)'} content={`${job?.jobLocation?.State}, ${job?.jobLocation?.government}`} icon={UilMapMarker} /></li>
                <li><JobSeekerProfileItem width='100%'  content={job?.JobCategory} backgroundColor={'var(--border03)'} icon={UilBag} /></li>
                <li><JobSeekerProfileItem width='100%'  content={job?.JobType} backgroundColor={'var(--border03)'} icon={UilClock} /></li>
                <li><JobSeekerProfileItem width='100%' content={job?.JoblocationType} backgroundColor={'var(--border03)'} icon={UilMapPinAlt} /></li>
                <li><JobSeekerProfileItem width='100%' content={`${job?.salary?.from} - ${job?.salary?.to}`} backgroundColor={'var(--border03)'} icon={UilDollarAlt} /></li>
                <li><JobSeekerProfileItem width='100%' content={job?.jobLevel} backgroundColor={'var(--border03)'} icon={UilUser} /></li>
                
                </ul>
              </div>
              <div
                className={`position-relative ${styles.JobsSideBar} `}
              >
                <label className={`${styles.OtherJobs}  px-3`}>Other Jobs</label>
                <div className={`${styles.othersJobsSideBar} p-1 `}>
                  <div className={`${styles.parent} mt-4`}>
                    <div className={styles.sideBarContent}>
                      {jobs.slice(0, count).map((job) => (
                        <div key={job._id} className={styles.content}>
                          <div className={styles.companyLogo}>
                            <img
                              src={job.companyId.companyLogo}
                              alt="companyLogo"
                              className={styles.logo}
                            />
                          </div>
                          <div className={`${styles.text} `}>
                            <Link to={`/JobsDetails/${job._id}`}>
                              <h5 className={styles.jobTitleSideBar}>{job.JobTitle}</h5>
                            </Link>
                            <Link to={`/company-profile/${job?.companyId?._id}`} className='my-2'>
                              <p className={styles.companyNameSideBar}>
                                {job.companyId.companyName}
                              </p>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={handelShowMore} className='btn btn-success my-3 mx-auto w-50 d-block'>Show More</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <PopUp
        show={show}
        handleClose={handleClose}

        body={<>
          <div className='w-100 '><img src={congrats} alt="" width="80%" height="80%" /></div>
          <p className=' fw-bold my-3  text-center'>Congratulations, your application has been successfully submitted. We wish you the best of luck!</p>
          <button className='d-block m-auto btn btn-success' onClick={handleClose}>Ok</button>
        </>
        }

      />
    </>
  );
};

export default JobsDetails;
