import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form } from 'react-bootstrap';
import { getAllUsersAction } from '../../store/Slices/usersSlice';
import styles from './skillsList.module.css';
import Skills from '../../component/Skills/index';

const SkillsList = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(getAllUsersAction(userId));
  }, [dispatch, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const placeholderText = user?.skills?.length > 0
    ? user.skills.map((skill, index) => <Skills name={skill}/>)
    : "No skills available";

  return (
   <div>
  <div className="form-group mb-4 position-relative">
    <label className={`position-absolute bg-white ${styles.inputLabel}`} style={{ top: '-10px', left: '15px' }}>
      Skills
    </label>
    <div className="col-sm-11">
      <div
        type="text"
        name="overview"
        className={`form-control ${styles.jobSeekerInput} ${styles.inputField}`}
        disabled
          >
              <ul className={styles.skillsList}>
        {user?.skills && user.skills.length > 0 ? (
          user.skills.map((skill, index) => (
            <li key={index}>
              <Skills name={skill} />
            </li>
          ))
        ) : (
          <li>No skills</li>
        )}
      </ul>
      </div>
    
    </div>
  </div>
</div>

  );
};

export default SkillsList;
