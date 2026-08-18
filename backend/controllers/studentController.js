const db = require('../config/db');

// GET /api/students - Get all students
const getAllStudents = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM students ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/students/:id - Get single student
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/students - Add new student
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, studentId, dateOfBirth, contactNumber, enrollmentDate } = req.body;
    const query = `
      INSERT INTO students (first_name, last_name, email, student_id, date_of_birth, contact_number, enrollment_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [firstName, lastName, email, studentId, dateOfBirth, contactNumber, enrollmentDate];
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/students/:id - Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
};