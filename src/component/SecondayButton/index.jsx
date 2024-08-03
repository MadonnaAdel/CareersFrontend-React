//import React from 'react'
import styles from './style.module.css'

 const SecondaryButton = ({name}) => {
  return (
    <button className={styles.btn}>{name}</button>
  )
}

export default SecondaryButton;