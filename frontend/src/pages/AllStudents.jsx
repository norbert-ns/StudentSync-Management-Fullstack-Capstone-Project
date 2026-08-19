import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddStudentModal from "../components/AddStudentModal";
import { getStudents, addStudent, deleteStudent } from "../services/studentService";

import defaultAvatar from "../assets/default-profile.png";
import "./AllStudents.css";

const PAGE_SIZE = 7;

export default function AllStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loadError, setLoadError] = useState("");

  const loadStudents = useCallback(async (opts = {}) => {
    setIsLoading(true);
    setLoadError("");
    try {
      const result = await getStudents({
        search: opts.search ?? search,
        page: opts.page ?? page,
        pageSize: PAGE_SIZE,
      });
      setStudents(result.students);
      setTotal(result.total);
      setTotalPages(result.totalPages);
      setPage(result.page);
    } catch (err) {
      setLoadError(err.message || "Couldn't load students. Is the backend server running?");
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial load
  useEffect(() => {
    loadStudents({ page: 1 });
  }, [loadStudents]);

  // Debounced search - reset to page 1 whenever the query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      loadStudents({ search, page: 1 });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function goToPage(nextPage) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    loadStudents({ page: nextPage });
  }

  async function handleAddStudent(formData) {
    setIsSubmitting(true);
    try {
      await addStudent(formData);
      setIsModalOpen(false);
      await loadStudents({ page: 1 });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id, label) {
    const confirmed = window.confirm(`Remove ${label} from the list?`);
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteStudent(id);
      const isLastRowOnPage = students.length === 1 && page > 1;
      await loadStudents({ page: isLastRowOnPage ? page - 1 : page });
    } catch (err) {
      setLoadError(err.message || "Couldn't delete that student.");
    } finally {
      setDeletingId(null);
      setOpenMenuId(null);
    }
  }

  function handleViewDetails(id) {
    setOpenMenuId(null);
    navigate(`/students/${id}`);
  }

  function statusClass(status) {
    switch (status) {
      case "Enrolled":
        return "status-pill status-enrolled";
      case "Pending":
        return "status-pill status-pending";
      case "Withdrawn":
        return "status-pill status-withdrawn";
      default:
        return "status-pill";
    }
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="all-students-page">
      <div className="all-students-toolbar">
        <h1 className="all-students-title">All students</h1>
        <div className="all-students-actions">
          <div className="search-box">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search students by name or student ID"
            />
          </div>
          <button className="add-student-btn" onClick={() => setIsModalOpen(true)}>
            + Add student
          </button>
        </div>
      </div>

      {loadError && <div className="all-students-error">{loadError}</div>}

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>User name</th>
              <th>Student ID</th>
              <th>Enrollment date</th>
              <th>Status</th>
              <th className="action-col">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="table-message">
                  Loading students…
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={5} className="table-message">
                  {search ? `No students match "${search}".` : "No students yet."}
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const fullName = `${student.firstName} ${student.lastName}`;
                return (
                  <tr key={student.id}>
                    <td>
                      <div className="user-cell">
                        <img
                          src={defaultAvatar}
                          alt=""
                          className="user-avatar"
                          width={32}
                          height={32}
                        />
                        <span>{fullName}</span>
                      </div>
                    </td>
                    <td>{student.studentId}</td>
                    <td>{student.enrollmentDateDisplay || student.enrollmentDate}</td>
                    <td>
                      <span className={statusClass(student.status)}>{student.status}</span>
                    </td>
                    <td className="action-col">
                      <div className="action-cell">
                        <div className="menu-wrapper">
                          <button
                            className="icon-btn menu-trigger"
                            aria-label="More actions"
                            onClick={() =>
                              setOpenMenuId(openMenuId === student.id ? null : student.id)
                            }
                          >
                            •••
                          </button>
                          {openMenuId === student.id && (
                            <div className="menu-dropdown" role="menu">
                              <button role="menuitem" onClick={() => handleViewDetails(student.id)}>
                                View details
                              </button>
                              <button role="menuitem" onClick={() => setOpenMenuId(null)}>
                                Edit
                              </button>
                            </div>
                          )}
                        </div>
                        <button
                          className="icon-btn delete-btn"
                          aria-label={`Delete ${fullName}`}
                          onClick={() => handleDelete(student.id, fullName)}
                          disabled={deletingId === student.id}
                        >
                          {deletingId === student.id ? "…" : "🗑"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {pageNumbers.map((n) => (
            <button
              key={n}
              className={n === page ? "page-btn page-btn-active" : "page-btn"}
              onClick={() => goToPage(n)}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}