const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// GET all students
router.get('/', getAllStudents);

// GET single student by ID
router.get('/:id', getStudentById);

// POST create a new student
router.post('/', createStudent);

// PUT update student details
router.put('/:id', updateStudent);

// DELETE student
router.delete('/:id', deleteStudent);

module.exports = router;