import React, {useState} from "react";
import {Button ,Modal, Form} from 'react-bootstrap'
import { ModalDialog } from "react-bootstrap";
import { Component } from "react"
import "./AddBook.css";
import "bootstrap/dist/css/bootstrap.css";


function AddBook() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>Add Book</Button>

      <Modal show = {show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-label-addbook">Add Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Select aria-label="Default select">
              <option value="1">Book Title 1</option>
              <option value="2">Book Title 2</option>
              <option value="3">Book Title 3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="input-quantity">Quantity</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Condition</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleClose}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddBook;
