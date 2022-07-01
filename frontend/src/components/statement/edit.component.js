import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [particulars, setParticulars] = useState("Select");
  const [type, setType] = useState("Select");
  //const [particularsList, setParticularsLists] = useState([]);
  const particularsList = ["Salary", "Cash"];
  const typeList = ["Credit", "Debit"];
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState();
  const [date, setDate] = useState("");
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchStatement();
  }, []);

  const fetchStatement = async () => {
    await axios
      .get(`http://localhost:8000/api/statements/${id}`)
      .then(({ data }) => {
        const { amount, particulars, type, statement_date } = data.statement;
        setAmount(amount);
        setParticulars(particulars);
        setType(type);
        setDate(statement_date);
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  const updateStatement = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("particulars", particulars);
    formData.append("type", type);
    formData.append("amount", amount);
    formData.append("statement_date", date);
    formData.append("note", note);

    await axios
      .post(`http://localhost:8000/api/statements/${id}`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/");
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
              <h4 className="card-title">Update Statement</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
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
                )}
                <Form onSubmit={updateStatement}>
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
                    Update
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
