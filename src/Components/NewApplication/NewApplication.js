import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useLocation, useNavigate, useParams} from "react-router";
import axios from "axios";
// import {useKeycloak} from "@react-keycloak/web";
// import Api from "../../utils/api";

function NewApplication() {
    const [applicationData, setApplicationData] = useState({});
    const formRef = useRef();
    const {id} = useParams();
    // const {keycloak} = useKeycloak();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // e.preventDefault();
        // const form = formRef.current;
        // const dataForm = {
        //     propertyId: id,
        //     applicationType: form["optionType"].value,
        //     employmentInfo: form["employmentInfo"].value,
        //     creditScore: form["creditScore"].value,
        //     message: form["message"].value,
        //     date: form["date"].value,
        // };

        // setApplicationData(dataForm);
        // Api.post("/api/v1/applications", dataForm,{
        //     headers: keycloak?.token ? {authorization: `Bearer ${keycloak?.token}`} : {}
        // }  ).then(response => {
        //     navigate("/applications")
        // }).catch(error => {
        //     console.log(error)
        // })
        // e.target.reset();
    };
    console.log(applicationData);
    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 5 }}>
                    <h2 style={{ color: "purple" }} className="text-center">
                        Submit Your Application Today
                    </h2>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={{ offset: 3, span: 5 }}>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                <b>Application Type</b>
                            </Form.Label>
                            <Form.Select
                                name={"optionType"}
                                aria-label="Default select example"
                            >
                                <option value="BUY">BUY</option>
                                <option value="RENT">RENT</option>
                                <option value="TOUR">TOUR</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                Did you know you can pay in installments?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <b>Employment Info</b>
                            </Form.Label>
                            <Form.Control
                                required={true}
                                name={"employmentInfo"}
                                type="text"
                                placeholder="Employment info"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <b>Credit Score</b>
                            </Form.Label>
                            <Form.Control
                                required={true}
                                name={"creditScore"}
                                type="number"
                                placeholder="Credit Score"
                            />
                            <Form.Text className="text-muted">
                                We'll never share your credit score with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <b>Message</b>
                            </Form.Label>

                            <Form.Control
                                required={true}
                                name={"message"}
                                as="textarea"
                                rows={3}
                                placeholder="Message"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <b>Date</b>
                            </Form.Label>
                            <Form.Control
                                required={true}
                                name={"date"}
                                type="date"
                                placeholder="Date"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default NewApplication;
