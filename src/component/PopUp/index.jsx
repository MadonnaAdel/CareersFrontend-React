import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css"; 

const PopUp = ({ show, handleClose, img, body }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body className="text-center">
        <div className="w-25 m-auto">
         {img && img}
        </div>
        {body}
      </Modal.Body>
    </Modal>
  );
};

PopUp.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  body: PropTypes.node,
};

PopUp.defaultProps = {
  body: null,
};

export default PopUp;
