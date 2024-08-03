import React from "react";
import { useTranslation } from 'react-i18next';
import AccordionItem from "../../component/AccordionItem/index";
import styles from "./style.module.css";

const WhyChooseUs = () => {
  const { t,i18n } = useTranslation();

  return (
    <>
      <div className={styles.glassy} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <div className={styles.container}>
          <div className="row mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h2 className={styles.mainTitle}>{t('How it works?')}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-3 col-xs-3">
              <img src="account.svg" alt="icons"></img>
              <h6 className={styles.subTitle}>{t('Create Account')}</h6>
              <p className={styles.paragraph}>
                {t("It’s very easy to open an account and start your journey.")}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-3 col-xs-3">
              <img src="editFile.svg" alt="icons"></img>
              <h6 className={styles.subTitle}>{t('Complete your profile')}</h6>
              <p className={styles.paragraph}>
                {t("Complete your profile with all the info to get attention of client.")}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-3 col-xs-3">
              <img src="Edit.svg" alt="icons"></img>
              <h6 className={styles.subTitle}>{t('Apply job or hire')}</h6>
              <p className={styles.paragraph}>
                {t("Apply & get your preferable jobs with all the requirements and get it.")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className="row">
          <div className="col-lg-6 col-md-4 col-sm-12">
            <div className={styles.parent}>
              <p className={styles.par}>{t('Why choose us?')}</p>
              <h2>{t('World of talent at your fingertips')}</h2>
              <div className="accordion">
                <AccordionItem
                  title={t('Who we are?')}
                  content={t('Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering teams at Facebook quesi. Lorem ipsum dolor sit, amet consectetur adipisicing elit.')}
                />
                <AccordionItem
                  title={t("What's our goal")}
                  content={t('Content for our goal goes here.')}
                />
                <AccordionItem
                  title={t('Our vision')}
                  content={t('Content for our vision goes here.')}
                />
              </div>
              <button className={styles.btn1}>{t('Learn More')}</button>
            </div>
          </div>
          <div className="col-lg-6 col-md-4 col-sm-12">
            <div className={styles.photos}>
              <img src="Candidates.png" alt="photo" className={styles.photo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
