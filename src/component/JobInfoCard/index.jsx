import React from "react";
import styles from "./JobInfoCard.module.css";

const JobInfoCard = ({ img,icon, text, backgroundColor = "var(--border03)" }) => {
  const bgColor = text === "Part Time" ? "#FEF2D9" : backgroundColor;

  return (
    <div 
      className={`${styles.Container} d-flex justify-content-center align-items-center`} 
      style={{ backgroundColor: bgColor }}
    >
      <img src={img} alt="Icon" />
      {icon}
      <p className={`m-0 ${styles.Text}`}>{text}</p>
    </div>
  );
};

export default JobInfoCard;
