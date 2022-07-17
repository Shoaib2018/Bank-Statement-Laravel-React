import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import EditStatement from "./components/statement/edit.component";
import StatementList from "./components/statement/list.component";
import CreateStatement from "./components/statement/create.component";

function App() {
  return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            Bank Statement
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/statement/create" element={<CreateStatement />} />
              <Route path="/statement/edit/:id" element={<EditStatement />} />
              <Route path="/statements" element={<StatementList />} />
              <Route path="/" element={<StatementList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
