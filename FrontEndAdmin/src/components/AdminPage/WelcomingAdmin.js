import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../style/AdminPanel.css"

function WelcomingAdmin() {

  return (
    <Container className="centeredContentStyle">
      <h1>Welcome to Careerly Admin Dashboard</h1>
      <div className="btnsContainerStyle">
        <Link to="/Applications">
          <Button className="Admin__btn" >
            Applications
          </Button>
        </Link>
        <Link to="/Vacancies">
          <Button className="Admin__btn">
            Vacancies
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default WelcomingAdmin;
