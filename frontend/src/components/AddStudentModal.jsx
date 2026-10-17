import { useState } from "react";
import "./AddStudentModal.css";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  studentId: "",
  email: "",
  contactNumber: "",
  enrollmentDate: "",
};

/**
 * AddStudentModal
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - onSubmit: (formData) => Promise<void> | void   (parent calls studentService.addStudent)
 * - isSubmitting: boolean (optional, parent-controlled loading state)
 *
 * Field names here match studentController.js's createStudent destructure
 * exactly (firstName, lastName, email, studentId, dateOfBirth,
 * contactNumber, enrollmentDate) - no renaming needed before the POST body.
 */
export default function AddStudentModal({ isOpen, onClose, onSubmit, isSubmitting = false }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!form.studentId.trim()) next.studentId = "Required";
    if (!form.enrollmentDate.trim()) next.enrollmentDate = "Required";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Invalid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function resetAndClose() {
    setForm(EMPTY_FORM);
    setErrors({});
    setFormError("");
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    try {
      await onSubmit(form);
      setForm(EMPTY_FORM);
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="asm-overlay" role="presentation" onClick={resetAndClose}>
      <div
        className="asm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="asm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="asm-header">
          <div className="asm-brand">
            <span className="asm-brand-icon" aria-hidden="true">
              
            </span>
            <span className="asm-brand-name">STUDENTSYNC</span>
          </div>
          <h2 id="asm-title" className="asm-title">
            Add new student
          </h2>
        </div>

        <form className="asm-form" onSubmit={handleSubmit} noValidate>
          <div className="asm-row">
            <div className="asm-field">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? "asm-input-error" : ""}
              />
              {errors.firstName && <span className="asm-error-text">{errors.firstName}</span>}
            </div>
            <div className="asm-field">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? "asm-input-error" : ""}
              />
              {errors.lastName && <span className="asm-error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="asm-row">
            <div className="asm-field">
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="asm-field">
              <label htmlFor="studentId">Student ID</label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                value={form.studentId}
                onChange={handleChange}
                className={errors.studentId ? "asm-input-error" : ""}
              />
              {errors.studentId && <span className="asm-error-text">{errors.studentId}</span>}
            </div>
          </div>

          <div className="asm-field asm-field-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "asm-input-error" : ""}
            />
            {errors.email && <span className="asm-error-text">{errors.email}</span>}
          </div>

          <div className="asm-field asm-field-full">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              value={form.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="asm-field asm-field-full">
            <label htmlFor="enrollmentDate">Enrollment date</label>
            <input
              id="enrollmentDate"
              name="enrollmentDate"
              type="date"
              value={form.enrollmentDate}
              onChange={handleChange}
              className={errors.enrollmentDate ? "asm-input-error" : ""}
            />
            {errors.enrollmentDate && (
              <span className="asm-error-text">{errors.enrollmentDate}</span>
            )}
          </div>

          {formError && <div className="asm-form-error">{formError}</div>}

          <div className="asm-actions">
            <button type="submit" className="asm-btn asm-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add"}
            </button>
            <button
              type="button"
              className="asm-btn asm-btn-secondary"
              onClick={resetAndClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}