import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateStatement() {
  const navigate = useNavigate();

  const [particulars, setParticulars] = useState("");
  const [type, setType] = useState("");
  //const [particularsList, setParticularsLists] = useState([]);
  const particularsList = ['Salary', 'Cash'];
  const typeList = ["Credit", "Debit"];
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [validationError, setValidationError] = useState({});

  const CreateStatement = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("particulars", particulars);
    formData.append("type", type);
    formData.append("amount", amount);
    formData.append("statement_date", date);
    formData.append("note", note);

    await axios
      .post(`http://localhost:8000/api/statements`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/statements");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <Link className="btn btn-primary mb-2 float-end" to={"/statements"}>
            Statements
          </Link>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Statement</h4>
              <hr />
              <div className="form-wrapper">
                {/* {(typeof validationError.statement_date !== 'undefined' && validationError.statement_date !== "") ? 'Yes' : 'No'} */}
                {/* {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )} */}
                <Form onSubmit={CreateStatement}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          type="number"
                          value={amount}
                          onChange={(event) => {
                            setAmount(event.target.value);
                          }}
                        />
                      </Form.Group>
                      {(typeof validationError.amount !== 'undefined' && validationError.amount !== "") ?
                                <div className="row">
                                  <div className="col-12">
                                    <div className="alert alert-danger">
                                      <ul className="mb-0">
                                            <li>{validationError.amount}</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div> : ''}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Type">
                        <Form.Label>Type</Form.Label>
                        <Dropdown>
                          <DropdownToggle caret>{type}</DropdownToggle>
                          <DropdownMenu>
                            {typeList.map((type) => {
                              return (
                                <DropdownItem
                                  onClick={() => setType(type)}
                                  dropDownValue={type}
                                >
                                  {type}
                                </DropdownItem>
                              );
                            })}
                          </DropdownMenu>
                        </Dropdown>
                      </Form.Group>
                      {(typeof validationError.type !== 'undefined' && validationError.type !== "") ?
                                <div className="row">
                                  <div className="col-12">
                                    <div className="alert alert-danger">
                                      <ul className="mb-0">
                                            <li>{validationError.type}</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div> : ''}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Particular">
                        <Form.Label>Particular</Form.Label>
                        <Dropdown>
                          <DropdownToggle caret>{particulars}</DropdownToggle>
                          <DropdownMenu>
                            {particularsList.map((particular) => {
                              return (
                                <DropdownItem
                                  onClick={() => setParticulars(particular)}
                                  dropDownValue={particular}
                                >
                                  {particular}
                                </DropdownItem>
                              );
                            })}
                          </DropdownMenu>
                        </Dropdown>
                      </Form.Group>
                      {(typeof validationError.particulars !== 'undefined' && validationError.particulars !== "") ?
                                <div className="row">
                                  <div className="col-12">
                                    <div className="alert alert-danger">
                                      <ul className="mb-0">
                                            <li>{validationError.particulars}</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div> : ''}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="datepic"
                          placeholder="DateRange"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </Form.Group>
                      {(typeof validationError.statement_date !== 'undefined' && validationError.statement_date !== "") ? <div className="row">
                                  <div className="col-12">
                                    <div className="alert alert-danger">
                                      <ul className="mb-0">
                                            <li>{validationError.statement_date}</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div> : ''}
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Note">
                        <Form.Label>Note</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={note}
                          onChange={(event) => {
                            setNote(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    className="mt-2"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
