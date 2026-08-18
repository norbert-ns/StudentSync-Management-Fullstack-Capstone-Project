const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
} = require('../controllers/studentController');

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);

module.exports = router;