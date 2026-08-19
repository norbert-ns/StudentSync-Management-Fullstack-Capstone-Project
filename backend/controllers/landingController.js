const db = require('../config/db');

// Get landing page summary stats
const getLandingStats = async (req, res) => {
  try {
    const studentCountResult = await db.query('SELECT COUNT(*) FROM students');
    const totalStudents = parseInt(studentCountResult.rows[0].count, 10);

    res.status(200).json({
      platformName: "STUDENTSYNC MANAGEMENT WEB APP",
      academicYear: "2025/2026",
      totalStudents: totalStudents,
      culturePillars: [
        { title: "Digital transformation", description: "Empowers students with tools and skills." },
        { title: "Disciplined and Productive", description: "Manage agenda and activities." },
        { title: "Race Towards Goodness", description: "Competing and striving in goodness." }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLandingStats
};