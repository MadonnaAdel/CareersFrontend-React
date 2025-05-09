import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Form } from 'react-bootstrap';
import styles from './overview.module.css';
import { getAllUsersAction } from '../../store/Slices/usersSlice';

const Overview = () => { 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
<div className='position-static'>
  <div className="form-group position-relative">
    <span className={`bg-white ${styles.inputLabel}`}>
      Overview
    </span>
    <div className="col-sm-11">
          <div className={`${styles.jobSeekerInput} ${styles.inputField}`} >
            {user?.overview}
          </div>
    </div>
  </div>
</div>

  );
};

export default Overview;
