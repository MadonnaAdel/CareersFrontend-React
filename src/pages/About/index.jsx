import React from 'react';
import styles from './style.module.css';
import { Row, Col, Container } from 'react-bootstrap';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import logo from "../../assets/images/careers-logo.png"
const AboutUsPage = () => {
  const leadersData = [
    {
      id: 1,
      name: 'Ahmed Mamdouh',
      position: 'Training Manager',
      photo: '../../../public/Mark.png',
      twitter: 'https://twitter.com/ahmedmamdouh',
      facebook: 'https://www.facebook.com/profile.php?id=719614708',
      instagram: 'https://instagram.com/ahmedmamdouh'
    },
    {
      id: 2,
      name: 'Ayman Ayad',
      position: 'Branch Manager',
      photo: '../../../public/Mark (1).png',
      twitter: 'https://twitter.com/aymanayad',
      facebook: 'https://www.facebook.com/profile.php?id=100010704792719',
      instagram: 'https://instagram.com/aymanayad'
    },
    {
      id: 3,
      name: 'Abanoub',
      position: 'Supervisor',
      photo: '../../../public/Mark (2).png',
      twitter: 'https://twitter.com/abanoub',
      facebook: 'https://facebook.com/abanoub',
      instagram: 'https://instagram.com/abanoub'
    }
  ];

  const teamData = [
    {
      id: 1,
      name: 'Mary Harby',
      position: 'UX Designer & Front End Developer',
      photo: '../../../public/Mark (3).png',
      twitter: 'https://twitter.com/maryharby',
      facebook: 'https://www.facebook.com/mero.harby.9',
      instagram: 'https://www.instagram.com/maryharby/'
    },
    {
      id: 2,
      name: 'Shrouk Gamal',
      position: 'Full Stack Developer',
      photo: '../../../public/Mark (4).png',
      twitter: 'https://twitter.com/shroukgamal',
      facebook: 'https://www.facebook.com/profile.php?id=100053262500191',
      instagram: 'https://instagram.com/shroukgamal'
    },
    {
      id: 3,
      name: 'Khloud Hanafy',
      position: 'UX Designer & Front End Developer',
      photo: '../../../public/Mark (5).png',
      twitter: 'https://twitter.com/khloudhanafy',
      facebook: 'https://www.facebook.com/kholoud.hanafy.9',
      instagram: 'https://instagram.com/khloudhanafy'
    },
    {
      id: 4,
      name: 'Salma Hammad',
      position: 'Full Stack Developer',
      photo: '../../../public/Mark (6).png',
      twitter: 'https://twitter.com/salmahamad',
      facebook: 'https://www.facebook.com/mariam.hammad.56',
      instagram: 'https://www.instagram.com/salma.hammad.98/'
    },
    {
      id: 5,
      name: 'Madonna Adel',
      position: 'Full Stack Developer',
      photo: '../../../public/Mark (7).png',
      twitter: 'https://twitter.com/madonnaadel',
      facebook: 'https://www.facebook.com/madonna.adel.9026',
      instagram: 'https://www.instagram.com/madonna._adel/'
    },
    {
      id: 6,
      name: 'Safynaz Abdelraheem',
      position: 'Full Stack Developer',
      photo: '../../../public/Mark (8).png',
      twitter: 'https://twitter.com/safyabdelrehim',
      facebook: 'https://www.facebook.com/safy.abdelraheem.1/',
      instagram: 'https://www.instagram.com/safynazabdelraheem/'
    }
  ];

  return (
    <>
    <Row className={`${styles.fullWidthBackground} justify-content-center`}>
      <Col md={8} className={`${styles.fullWidthText} text-center`}>
        <h2 className={styles.header}>About US</h2>
        <p className={styles.subHeader}>
          Please fill the form and we will guide you to the best solution. Our <br /> experts will get in touch soon.
        </p>
      </Col>
    </Row>
    <Container fluid>
      <section className={`${styles.descriptionSection} `}>
        <div className={styles.caresrs}>
        
       
      <div className={styles.caresrs1}>  <span className=' py-3 ps-3 '><img src={logo}  alt="logo" width="25%" height='100%' /></span> is a prominent Egyptian job search and recruitment platform designed to connect job seekers with employers across various industries in Egypt. </div>   

<div className={styles.caresrs1}>The platform provides an intuitive interface for job seekers to search for jobs and for employers to post job advertisements.</div>

 <div className={styles.caresrs1}>Key features include detailed personal profiles, resume uploads, and the ability to make profiles public or private to enhance visibility to potential employers.</div>
        </div>
       <div className={styles.img}>
        <img src="../../../public/Job hunt-amico 1.png" alt="" />
       </div>
      </section>
      {/* <section className={styles.leadersSection}>
        <h3>Meet Our Leaders</h3>
        <Row className={styles.members}>
          {leadersData.map(leader => (
            <Col key={leader.id} md={4} className={styles.teamMember}>
              <img src={leader.photo} alt={`${leader.name}`} />
              <h4>{leader.name}</h4>
              <p>{leader.position}</p>
              <div className={styles.socialLinks}>
                <a href={leader.twitter}><FaTwitter /></a>
                <a href={leader.facebook}><FaFacebook /></a>
                <a href={leader.instagram}><FaInstagram /></a>
              </div>
            </Col>
          ))}
        </Row>
      </section> */}
      {/* <section className={styles.teamSection}>
        <h3>Meet Our Team</h3>
        <Row className={styles.members}>
          {teamData.map(member => (
            <Col key={member.id} md={4} className={styles.teamMember}>
              <img src={member.photo} alt={`${member.name}`} />
              <h4>{member.name}</h4>
              <p>{member.position}</p>
              <div className={styles.socialLinks}>
                <a href={member.twitter}><FaTwitter /></a>
                <a href={member.facebook}><FaFacebook /></a>
                <a href={member.instagram}><FaInstagram /></a>
              </div>
            </Col>
          ))}
        </Row>
      </section> */}
    </Container>
  </>
);
};
export default AboutUsPage;
