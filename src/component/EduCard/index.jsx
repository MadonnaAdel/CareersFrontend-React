import React from 'react';
import styles from './EduCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EduCard = ({ name ,title, academy, description, from, to }) => {
    const dateRange = `${from} to ${to === 'Present' ? 'Present' : to}`;

    return (
        <>
        <h5>{name}</h5>

        <div className={`card ${styles.card} shadow-sm p-4 mb-4 bg-light rounded mx-3`}>
            <div className={styles.arrowLeft}></div>
            <h2 className={styles.cardTitle}>{title}</h2>
            <h3 className={styles.cardSubtitle}>{academy}</h3>
            <p className={styles.cardText}>{description}</p>
            <div className={`badge ${styles.dateRange}`}>{`From ${from} to ${to}`}</div>
        </div></>
    );
}

export default EduCard;
