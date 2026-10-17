/*Students Details JSX*/

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../services/studentService";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "./StudentDetails.css";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadStudent() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await getStudentById(id);
        if (isCurrent) setStudent(result);
      } catch (error) {
        if (isCurrent) setLoadError(error.message || "Couldn't load that student.");
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadStudent();
    return () => {
      isCurrent = false;
    };
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudent((previousStudent) => ({
      ...previousStudent,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing((previousState) => !previousState);
  };

  const handleGoBack = () => {
    navigate("/students");
  };

  if (isLoading) {
    return (
      <div className="app">
        <Navbar activePage="students" onAddClick={() => navigate("/students?add=1")} />
        <div className="student-details-page">Loading student...</div>
        <Footer />
      </div>
    );
  }

  if (loadError || !student) {
    return (
      <div className="app">
        <Navbar activePage="students" onAddClick={() => navigate("/students?add=1")} />
        <div className="student-details-page">
          <p>{loadError || "Student not found."}</p>
          <button className="back-button" onClick={handleGoBack}>
            Back to students
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const fullName = `${student.firstName} ${student.lastName}`;

  return (
    <div className="app">
     

      <div className="student-details-page">

        {/* Header */}
        <header className="student-header">
          <div>
            <h1>Welcome</h1>
            <p>Tue, 07 June 2022</p>
          </div>

          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search"
            />
          </div>
        </header>

        {/* Main Student Card */}
        <main className="student-card">

          {/* Green Banner */}
          <div className="student-banner"></div>

          <div className="student-content">

            {/* Profile Section */}
            <section className="student-profile">

              <div className="profile-info">

                <div className="profile-image">
                  <img
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Student profile"
                  />
                </div>

                <div>
                  <h2>{fullName}</h2>
                  <p>{student.email}</p>
                </div>

              </div>

              <button
                className="edit-button"
                onClick={handleEdit}
              >
                {isEditing ? "Save" : "Edit"}
              </button>

            </section>

            {/* Student Information */}
            <section className="student-information">

              <div className="form-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  value={student.firstName || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  value={student.lastName || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Student ID</label>

                <input
                  type="text"
                  name="studentId"
                  value={student.studentId || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={student.email || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>

                <input
                  type="text"
                  name="dateOfBirth"
                  value={student.dateOfBirth || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Contact Number</label>

                <input
                  type="text"
                  name="contactNumber"
                  value={student.contactNumber || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label>Enrollment Date</label>

                <input
                  type="text"
                  name="enrollmentDate"
                  value={student.enrollmentDate || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

            </section>

            {/* Email Section */}
            <section className="email-section">

              <h3>My email Address</h3>

              <div className="email-item">

                <div className="email-icon">
                  ✉
                </div>

                <div>
                  <p>{student.email}</p>
                  <span>1 month ago</span>
                </div>

              </div>

            </section>

            {/* Back Button */}
            <button
              className="back-button"
              onClick={handleGoBack}
            >
              ← Go back
            </button>

          </div>
        </main>
      </div>

    </div>
  );
}

export default StudentDetails;