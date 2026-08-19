const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/students";

function mapRowToStudent(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    studentId: row.student_id,
    dateOfBirth: row.date_of_birth,
    contactNumber: row.contact_number,
    enrollmentDate: row.enrollment_date,
    status: row.status || "Enrolled",
  };
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function parseErrorMessage(res, fallback) {
  try {
    const body = await res.json();
    return body.error || body.message || fallback;
  } catch {
    return fallback;
  }
}

/**
 * Fetch a page of students, optionally filtered by search text
 * (matches name or student ID). Backend has no search/pagination,
 * so this fetches the full list and slices it here.
 *
 * @param {{ search?: string, page?: number, pageSize?: number }} params
 * @returns {Promise<{ students: object[], total: number, page: number, pageSize: number, totalPages: number }>}
 */
export async function getStudents({ search = "", page = 1, pageSize = 7 } = {}) {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't load students."));
  }
  const rows = await res.json();
  const allStudents = rows.map(mapRowToStudent);

  const q = search.trim().toLowerCase();
  const filtered = q
    ? allStudents.filter((s) => {
        const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
        return fullName.includes(q) || String(s.studentId).includes(q);
      })
    : allStudents;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize).map((s) => ({
    ...s,
    enrollmentDateDisplay: formatDate(s.enrollmentDate),
  }));

  return { students: pageItems, total, page: safePage, pageSize, totalPages };
}

/**
 * Fetch a single student by id.
 * @param {string|number} id
 */
export async function getStudentById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (res.status === 404) throw new Error("Student not found.");
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't load that student."));
  }
  return mapRowToStudent(await res.json());
}

/**
 * Add a new student.
 * @param {object} studentData - firstName, lastName, dateOfBirth, studentId, email, contactNumber, enrollmentDate
 * @returns {Promise<object>} the created student record
 */
export async function addStudent(studentData) {
  const required = ["firstName", "lastName", "studentId", "enrollmentDate"];
  const missing = required.filter((field) => !studentData[field]?.trim?.());
  if (missing.length) {
    throw new Error(`Missing required field(s): ${missing.join(", ")}`);
  }

  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't add that student."));
  }
  return mapRowToStudent(await res.json());
}

/**
 * Delete a student by id.
 * @param {string|number} id
 */
export async function deleteStudent(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  if (res.status === 404) throw new Error("Student not found.");
  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't delete that student."));
  }
  return { id };
}

export { API_BASE_URL };