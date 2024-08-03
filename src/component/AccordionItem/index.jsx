//import React, { useState } from 'react';
import styles from './Style.module.css';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from 'react';

function AccordionItem({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
                <div className={styles['accordion-item']}>
                <div className={styles['accordion-header']} onClick={() => setIsActive(!isActive)}>
                    {title}
                    <span>{isActive ?  <IoIosArrowUp />: <IoIosArrowDown />}</span>
                </div>
                {isActive && <div className={styles['accordion-content']}><p>{content}</p></div>}
                </div>
                
       
    </>
  );
}

export default AccordionItem;
