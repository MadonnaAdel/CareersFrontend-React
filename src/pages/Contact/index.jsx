import {  Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './ContactForm.module.css';
import { toast } from 'react-toastify';

const ContactForm = () => {
  return (
    <>
      <Row className={`${styles.fullWidthBackground} justify-content-center`}>
        <Col md={8} className={`${styles.fullWidthText} text-center`}>
          <h2 className={styles.header}>Get in touch</h2>
          <p className={styles.subHeader}>
            Please fill the form and we will guide you to the best solution. Our experts will get in touch soon.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className={styles.icon} />
              </div>
              <p className={styles.infoTitle}>Our Address</p>
              <p>Cairo, Egypt</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faPhoneAlt} size="2x" className={styles.icon} />
              </div>
              <p className={styles.infoTitle}>Contact Info</p>
              <p>Open a chat or give us a call at <a href="tel:+201022616726">+20 1022616726</a></p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faEnvelope} size="2x" className={styles.icon} />
              </div>
              <p className={styles.infoTitle}>Our Email</p>
              <p>careers00111@gmail.com</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className={`position-relative ${styles.inputWrapper}`}>
                  <Form.Label htmlFor="formName" className={`position-absolute bg-white ${styles.label}`}>
                    Name
                  </Form.Label>
                  <Form.Control type="text" id="formName" className={`mb-4 form-control ${styles.formControl}`} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className={`position-relative ${styles.inputWrapper}`}>
                  <Form.Label htmlFor="formEmail" className={`position-absolute bg-white ${styles.label}`}>
                    Email
                  </Form.Label>
                  <Form.Control type="email" id="formEmail" className={`mb-4 form-control ${styles.formControl}`} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className={`position-relative ${styles.inputWrapper}`}>
                  <Form.Label htmlFor="formSubject" className={`position-absolute bg-white ${styles.label}`}>
                    Subject
                  </Form.Label>
                  <Form.Control type="text" id="formSubject" className={`mb-4 form-control ${styles.formControl}`} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className={`position-relative ${styles.inputWrapper}`}>
                  <Form.Label htmlFor="formPhone" className={`position-absolute bg-white ${styles.label}`}>
                    Phone
                  </Form.Label>
                  <Form.Control type="text" id="formPhone" className={`mb-4 form-control ${styles.formControl}`} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className={`position-relative ${styles.inputWrapper}`}>
              <Form.Label htmlFor="formMessage" className={`position-absolute bg-white ${styles.label}`}>
                Message
              </Form.Label>
              <Form.Control as="textarea" id="formMessage" rows={3} className={`mb-4 form-control ${styles.formControl}`} />
            </Form.Group>
            <Button className="btn btn-success w-100 m-auto mb-3 mt-3 d-flex align-items-center justify-content-center" onClick={()=> toast.success("Message Sent Successfully, we will contact you soon")}>
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ContactForm;
