// primaryButton/index.jsx
// import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

const PrimaryButton = ({ name, additionalClass, onClick }) => {
  return (
    <button className={`${styles.btn} ${additionalClass}`} onClick={onClick}>
      {name}
    </button>
  );
};

PrimaryButton.propTypes = {
  name: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
  onClick: PropTypes.func
};

PrimaryButton.defaultProps = {
  additionalClass: '',
  onClick: () => {}
};

export default PrimaryButton;
