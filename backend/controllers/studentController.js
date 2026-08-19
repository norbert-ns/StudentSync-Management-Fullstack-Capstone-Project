const db = require('../config/db');

// GET all students (Supports filtering by status and search by name/email)
const getAllStudents = async (req, res, next) => {
  const { status, search } = req.query;
  try {
    let queryText = `
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
    `;
    
    const queryParams = [];
    const conditions = [];

    if (status) {
      queryParams.push(status);
      conditions.push(`status = $${queryParams.length}`);
    }

    if (search) {
      queryParams.push(`%${search}%`);
      conditions.push(`(first_name ILIKE $${queryParams.length} OR last_name ILIKE $${queryParams.length} OR email ILIKE $${queryParams.length})`);
    }

    if (conditions.length > 0) {
      queryText += ` WHERE ` + conditions.join(' AND ');
    }

    queryText += ` ORDER BY id ASC;`;

    const result = await db.query(queryText, queryParams);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// GET single student by ID
const getStudentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// POST create a new student
const createStudent = async (req, res, next) => {
  const { first_name, last_name, date_of_birth, student_id, email, contact_number, enrollment_date, status } = req.body;
  
  // Required field validation
  if (!first_name || !last_name || !email || !student_id) {
    return res.status(400).json({ 
      error: 'Validation failed: first_name, last_name, email, and student_id are required fields.' 
    });
  }

  // Date of birth validation: must be 2010 or earlier
  if (date_of_birth) {
    const birthYear = new Date(date_of_birth).getFullYear();
    if (birthYear > 2010) {
      return res.status(400).json({ 
        error: 'Validation failed: Date of birth must be from 2010 or earlier.' 
      });
    }
  }

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
    next(error);
  }
};

// PUT update student details
const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const { first_name, last_name, date_of_birth, student_id, email, contact_number, enrollment_date, status } = req.body;
  
  // Required field validation
  if (!first_name || !last_name || !email || !student_id) {
    return res.status(400).json({ 
      error: 'Validation failed: first_name, last_name, email, and student_id are required fields.' 
    });
  }

  // Date of birth validation: must be 2010 or earlier
  if (date_of_birth) {
    const birthYear = new Date(date_of_birth).getFullYear();
    if (birthYear > 2010) {
      return res.status(400).json({ 
        error: 'Validation failed: Date of birth must be from 2010 or earlier.' 
      });
    }
  }

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
    next(error);
  }
};

// DELETE student
const deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM students WHERE id = $1 RETURNING *;', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found for deletion' });
    }
    res.status(200).json({ message: 'Student deleted successfully', student: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};