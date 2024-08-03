//import React from 'react';
import styles from './style.module.css';

const JobSeekerProfileItem = (
  { width, content, icon: Icon,backgroundColor,additionalclass }
) => {
  return (
    <>
     <div className={`${styles.userItem} ${additionalclass}`} style={{ width,backgroundColor }} >
      <Icon className='' /> 
      <div className='px-1 overflow-auto'><div>{content}</div></div>
     </div>
    </>
  );
};

export default JobSeekerProfileItem;
