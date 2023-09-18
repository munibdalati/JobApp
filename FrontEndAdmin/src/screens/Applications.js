import React from "react";
import NavComponent from "../components/Shared/NavComponent";
import Footer from "../components/Shared/Footer";
import { Container } from "react-bootstrap";

import ApplicationTable from '../components/Applications/ApplicationTable'

function Applications() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={containerStyle}>
      <NavComponent />
      <Container style={contentStyle}>
      <h1 style={{textAlign:"center"}}>Welcome to Careerly Admin Dashboard</h1>
        <h3>Applications Page</h3>
        <ApplicationTable />
      </Container>
      <Footer />
    </div>
  );
}

export default Applications;
