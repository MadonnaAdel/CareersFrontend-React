import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../../store/Slices/FetchJobsSlice';
import styles from './style.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getFormByJobId } from '../../store/Slices/FormJobsSlice';
import { applyForJob } from '../../store/Slices/AppliedJobsSlice';
import { toast } from 'react-toastify';
import PopUp from '../../component/PopUp';
import moment from 'moment';
import congrats from '../../assets/images/you Applied.svg'
const JobApplication = () => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.jobs.job);
  const forms = useSelector((state) => state.jobForm.jobForm);
  const { jobId } = useParams();
  const Navigate = useNavigate();
  const userId = localStorage.getItem('userId')
  const [firstAnswer, setFirstAnswer] = useState('');
  const [secondAnswer, setSecondAnswer] = useState('');
  const [thirdAnswer, setThirdAnswer] = useState('');
  const [FourthAnswer, setFourthAnswer] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    Navigate('/jobs')
  }
  const handleShow = () => {
    setShow(true)
  }

  const validAnswer = (answer) => {
    if (answer.length === 0) {
      toast.info('This field is required')
      return false;
    }
    return true;
  };

  const navigateToBack = () => {
    window.history.back();
  };


  useEffect(() => {
    if (jobId) {
      dispatch(getJobById(jobId));
      dispatch(getFormByJobId(jobId));
    }
  }, [dispatch, jobId]);

  const applyNow = async (event) => {
    event.preventDefault();
    const allAnswersValid = [firstAnswer, secondAnswer, thirdAnswer, FourthAnswer].every(validAnswer);
    if (!allAnswersValid) return;
    try {
      const resultAction = await dispatch(
        applyForJob({
          jobId,
          userId,
          FirstAnswer: firstAnswer,
          SecondAnswer: secondAnswer,
          thirdAnswer: thirdAnswer,
          FourthAnswer: FourthAnswer,
        })
      ).unwrap();
      handleShow();
         setFirstAnswer('');
    setSecondAnswer('');
    setThirdAnswer('');
    setFourthAnswer('');
    } catch (error) {
      toast.info('you have already applied to this job !')
    }
 
  };

  return (
    <>
      <div className={styles.searchPart}>
        <h4>Application Form</h4>
        <span className={`mt-2 ${styles.subtextitle}`}>Try to convince the company of yours</span>
        <span className={`m-0 ${styles.subtextitle}`}>GOOD LUCK!</span>
      </div>
      <div className="container">
        <div className={`d-flex m-4 ${styles.borderBottom}`}>
          <div>
            <img src={job?.companyId?.companyLogo} alt="company logo" className={styles.imgSize} />
          </div>
          <div className={`${styles.text} ms-3`}>
            <h4 className={styles.title}>{job?.JobTitle}</h4>
            <p className={styles.companyName}>{job?.companyName}</p>
            <div className={`d-flex`}>
              <img src="/clock.svg" alt="Clock Icon" />
              <p className={`m-0 ${styles.subtext}`}> {moment(job.timeStamp).fromNow()}</p>
            </div>
          </div>
        </div>
        <section className={styles.form}>
          <div className={`container ${styles.formContain}`}>
            <div className={`row ${styles.formContent}`}>
              <div className={`col-12 p-4 `}>
                <form onSubmit={applyNow}>
                  <div className="form-group input-component mt-4">
                    <div className="position-relative">
                      <label htmlFor="question1" className={` `}>
                        {forms?.FirstQuestion}
                      </label>
                      <textarea
                        name="question1"
                        id="question1"
                        className="mt-4 form-control"
                        value={firstAnswer}
                        onChange={(e) => setFirstAnswer(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group input-component mt-4">
                    <div className="position-relative">
                      <label htmlFor="question2" className={``}>
                        {forms?.SecondQuestion}
                      </label>
                      <textarea
                        name="question2"
                        id="question2"
                        className="mt-4 form-control"
                        value={secondAnswer}
                        onChange={(e) => setSecondAnswer(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group input-component mt-4">
                    <div className="position-relative">
                      <label htmlFor="question3" className={``}>
                        {forms?.ThirdQuestion}
                      </label>
                      <textarea
                        name="question3"
                        id="question3"
                        className="mt-4 form-control"
                        value={thirdAnswer}
                        onChange={(e) => setThirdAnswer(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group input-component mt-4">
                    <div className="position-relative">
                      <label htmlFor="question4" className={``}>
                        {forms?.FourthQuestion}
                      </label>
                      <textarea
                        name="question4"
                        id="question4"
                        className="mt-4 form-control"
                        value={FourthAnswer}
                        onChange={(e) => setFourthAnswer(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={`${styles.btns} d-flex justify-content-end`}>
                    <button
                      type="button"
                      className={`btn m-3 d-flex align-items-center justify-content-center ${styles.btnBack}`}
                      onClick={navigateToBack}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className={`btn m-3 d-flex align-items-center justify-content-center ${styles.btn}`}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
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

export default JobApplication;
