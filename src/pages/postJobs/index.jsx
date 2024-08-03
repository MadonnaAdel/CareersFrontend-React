
// import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import PrimaryButton from '../../component/primaryButton';
import SecondaryButton from '../../component/SecondayButton';
// import {faChartLine, faUser, faPenToSquare, faBriefcase, faNewspaper, faBookmark, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';



const Postjobs = () => {
    return (
        <>
      <div className={classNames(styles.mainContent,'row','d-flex')}>
       
  
        <div className={classNames(styles.rightSection,'col-md-8', 'm-2','m-auto')}>
          <h3 className={classNames(styles.formTitle, 'mt-4')}>Post Job</h3>
          <div className={styles.rightSectionForm}>
            <h6>Job Details</h6>
  
            <div className={styles.coolinput}>
              <label htmlFor="jobTitle" className={styles.text}>Job Title</label>
              <input type="text" placeholder="Write here..." name="jobTitle" className={styles.input}/>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="jobDescription" className={styles.text}>Job Description</label>
              <textarea className={styles.input} cols={60} rows={15} name="jobDescription" placeholder="Write here..."></textarea>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="jobCategory" className={styles.text}>Job Category</label>
              <select name="category" id="jobCategory" className={styles.select}>
                <option value="" defaultValue>Choose...</option>
                <option value="Engineering">Engineering</option>
                <option value="Teaching">Teaching</option>
                <option value="Development">Development</option>
              </select>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="jobType" className={styles.text}>Job Type</label>
              <select name="jobType" id="jobType" className={styles.select}>
                <option value="" defaultValue>Choose...</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="onsiteRemote" className={styles.text}>Onsite/Remote</label>
              <select name="onsiteRemote" id="onsiteRemote" className={styles.select}>
                <option value="" defaultValue>Choose...</option>
                <option value="On-Site">On-Site</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="salary" className={styles.text}>Salary</label>
              <input type="text" placeholder="Write here..." name="salary" className={styles.input}/>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="experience" className={styles.text}>Experience</label>
              <input type="text" placeholder="Write here..." name="experience" className={styles.input}/>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="skills" className={styles.text}>Skills</label>
              <select name="skills" id="skills" className={styles.select}>
                <option value="" defaultValue>Choose...</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
              </select>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="jobRequirements" className={styles.text}>Job Requirements</label>
              <input type="text" placeholder="Write here..." name="jobRequirements" className={styles.input}/>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="jobLevel" className={styles.text}>Job Level</label>
              <select name="jobLevel" id="jobLevel" className={styles.select}>
                <option value="" defaultValue>Choose...</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="status" className={styles.text}>Status</label>
              <select name="status" id="status" className={styles.select}>
                <option value="" defaultValue>Choose...</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
  
            <div className={styles.coolinput}>
              <label htmlFor="jobStartingTime" className={styles.text}>Job Starting Time</label>
              <input type="datetime-local" name="jobStartingTime" className={styles.input}/>
            </div>
  
            <div>
              <PrimaryButton name='Add Question'/>
            </div>
          </div>
            
        <div className={styles.rightBtnContainer}>
          <PrimaryButton name='Post Job'/>
          <SecondaryButton name='Back'/>
        </div>
        </div>
      </div></>
    );
  };
  
  export default Postjobs;



