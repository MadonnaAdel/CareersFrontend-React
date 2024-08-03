

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/Home');
  };

  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundContent}>
      
        <img src="/404 Error Page not Found with people connecting a plug-pana.png" alt="404 illustration" />
        <p>
          "Oopsie! It seems like we've wandered off the beaten path in cyberspace!
          Let's team up and get you back on track together."
        </p>
        <button className={styles.backButton} onClick={goToHome}>Back To Home</button>
      </div>
    </div>
  );
};

export default NotFound;
