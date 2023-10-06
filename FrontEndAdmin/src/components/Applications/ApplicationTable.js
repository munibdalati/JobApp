import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "../../style/ConfirmWindow.css";

function ApplicationTable() {
  const tableHeadings = [
    "Vacancy",
    "First Name",
    "Last Name",
    "Gender",
    "Age",
    "Country of Residence",
    "City",
    "Street",
    "Building Number",
    "Email",
    "Mobile Number",
    "Educational Level",
    "Field of Studying",
    "Years of Experience",
    "CV",
    "Notes",
    "Date Applied",
    "Delete",
  ];

  const [data, setData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State variable for showing/hiding the confirmation alert
  const [deleteCandidateId, setDeleteCandidateId] = useState(null); // Track the candidate ID to delete
  const [deleteCandidateTitle, setDeleteCandidateTitle] = useState(""); // Track the candidate title to delete





  // useEffect to get all the Applications
  useEffect(() => {
    axios
      .get("https://job-app-api-alpha.vercel.app/api/application/allApplications")
      .then((res) => {
        setData(res.data.data.applications);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Filter the applications based on the selected title
  const filteredApplications = selectedTitle
    ? data.filter((application) => application.title === selectedTitle)
    : data;

    // delete Applciation function
  const deleteApplication = async (id) => {
    try {
      await axios.delete(
        "https://job-app-api-alpha.vercel.app/api/application/deleteApplication/" + id,
        {
          data: { application: id },
        }
      );
      window.location.reload();
      console.log("deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteCandidateId(null); // Reset the candidate ID
      setShowAlert(false); // Hide the confirmation alert
    }
  };

    // Function to format date and time
    const formatDateTime = (dateTime) => {
      const dateObj = new Date(dateTime);
      const hour = dateObj.getUTCHours().toString().padStart(2, "0");
      const minute = dateObj.getUTCMinutes().toString().padStart(2, "0");
      const day = dateObj.getUTCDate().toString().padStart(2, "0");
      const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
      const year = dateObj.getUTCFullYear();
      return ` ${day}/${month}/${year} - ${hour}:${minute}`;
    };
  return (
    <Container>
    {data.length === 0 ? (
        <h4 className="text-center my-5">No Applications are available at the moment</h4>
      ) : (
        <div>
        <Row className="my-4">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Select
            aria-label="Default select example"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            required
          >
            <option value="">Filter applications via vacancies</option>
            {data.map((application, index) => (
              <option key={index} value={application.title}>
                {application.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            {tableHeadings.map((heading, index) => (
              <th
                style={{ whiteSpace: "nowrap", textAlign: "center" }}
                key={index}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((application, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.title}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.firstName}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.lastName}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.gender}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.age}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.countryOfResidence}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.city}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.street}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.buildingNumber}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.email}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.mobileNumber}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.educationalLevel}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.fieldOfStudying}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.yearsOfExperience}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.cv}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {application.notes}
              </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {formatDateTime(application.createdAt)}
                  </td>
              <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                <i
                  class="fa-solid fa-trash"
                  style={{ color: "#FF0000", cursor: "pointer" }}
                  onClick={() => {
                    setDeleteCandidateId(application._id); // Set the candidate ID to delete
                    setShowAlert(true);
                    setDeleteCandidateTitle(application.firstName+' '+application.lastName);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Confirmation Alert */}
      {showAlert && (
        <div className="confirmation-alert">
          <p>Are you sure you want to delete <strong>{deleteCandidateTitle}</strong> application?</p>
          <button
            className="confirm-button"
            onClick={() => deleteApplication(deleteCandidateId)}
          >
            Confirm
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setDeleteCandidateId(null); // Reset the candidate ID
              setShowAlert(false); // Hide the confirmation alert
            }}
          >
            Cancel
          </button>
        </div>
      )}
        </div>

      )}
    </Container>
  );
}

export default ApplicationTable;