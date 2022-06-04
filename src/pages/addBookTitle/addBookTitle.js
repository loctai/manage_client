import React, {useState} from "react";
import {Button ,Modal, Form, ModalHeader} from 'react-bootstrap'
import { ModalDialog } from "react-bootstrap";
import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { DropdownButton, Dropdown, FormControl, InputGroup} from "react-bootstrap";
import "./AddBook.css";
import "bootstrap/dist/css/bootstrap.css";


function AddBookTitle (){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <Button variant="primary" onClick={() => setShow(true)}>Add Book Title</Button>
            <Modal show = {show} onHide = {handleClose}> 
                <Modal.Header closeButton>
                    <Modal.Title>ADD BOOK TITLE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as = {Col} controlId = "formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Form.Group>

                            <Form.Group as = {Col} controlId = "formGridCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Select aria-label = "Default select">
                                    <option value = "1">Category 1</option>
                                    <option value = "2">Category 2</option>
                                    <option value = "3">Category 3</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as = {Col} control = "formGridAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type = "text"></Form.Control>
                            </Form.Group>

                            <Form.Group as = {Col} controlId = "formGridImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type = "text"></Form.Control>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddBookTitle;