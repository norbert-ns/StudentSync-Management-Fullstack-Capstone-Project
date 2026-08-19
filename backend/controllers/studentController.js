const db = require('../config/db');

// GET all students (Powers All Students Page table)
const getAllStudents = async (req, res) => {
  try {
    const queryText = `
      SELECT 
        id, 
        first_name, 
        last_name, 
        (first_name || ' ' || last_name) AS user_name, 
        date_of_birth, 
        student_id, 
        email, 
        contact_number, 
        enrollment_date, 
        status
      FROM students 
      ORDER BY id ASC;
    `;
    const result = await db.query(queryText);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single student by ID (Powers Student Details page/modal)
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create a new student (Powers "Add new student" modal form)
const createStudent = async (req, res) => {
  const { first_name, last_name, date_of_birth, student_id, email, contact_number, enrollment_date, status } = req.body;
  try {
    const queryText = `
      INSERT INTO students (first_name, last_name, date_of_birth, student_id, email, contact_number, enrollment_date, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [first_name, last_name, date_of_birth, student_id, email, contact_number, enrollment_date || new Date(), status || 'Enrolled'];
    const result = await db.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT update student details (Powers Edit/Update action in Student Details)
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, date_of_birth, student_id, email, contact_number, enrollment_date, status } = req.body;
  try {
    const queryText = `
      UPDATE students 
      SET first_name = $1, last_name = $2, date_of_birth = $3, student_id = $4, email = $5, contact_number = $6, enrollment_date = $7, status = $8
      WHERE id = $9
      RETURNING *;
    `;
    const values = [first_name, last_name, date_of_birth, student_id, email, contact_number, enrollment_date, status, id];
    const result = await db.query(queryText, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found for update' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE student (Powers trash icon deletion on All Students table)
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM students WHERE id = $1 RETURNING *;', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found for deletion' });
    }
    res.status(200).json({ message: 'Student deleted successfully', student: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};