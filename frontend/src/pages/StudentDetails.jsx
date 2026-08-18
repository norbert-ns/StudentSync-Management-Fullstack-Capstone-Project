import { useState } from "react";
import "./StudentDetails.css";

function StudentDetails() {
  const [isEditing, setIsEditing] = useState(false);

  const [student, setStudent] = useState({
    firstName: "Edison",
    lastName: "SHEMA",
    studentId: "KC 250248",
    email: "edison.shema25eba25@keplrcollege.ac.rw",
    dateOfBirth: "28 June 2005",
    contactNumber: "+250 792942736",
    enrollmentDate: "07 June 2025",
  });

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
    window.history.back();
  };

  return (
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
                <h2>Edison SHEMA</h2>
                <p>edison.shema25eba25@keplrcollege.ac.rw</p>
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
                value={student.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                value={student.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Student ID</label>

              <input
                type="text"
                name="studentId"
                value={student.studentId}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>

              <input
                type="text"
                name="dateOfBirth"
                value={student.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>

              <input
                type="text"
                name="contactNumber"
                value={student.contactNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Enrollment Date</label>

              <input
                type="text"
                name="enrollmentDate"
                value={student.enrollmentDate}
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
  );
}

export default StudentDetails;