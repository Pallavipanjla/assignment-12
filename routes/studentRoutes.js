const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// GET /students         - Get all students (supports ?search=)
// POST /students/add    - Add new student
// GET /students/:id     - Get single student
// POST /students/update/:id - Update student
// GET /students/delete/:id  - Delete student

router.get("/", studentController.getAllStudents);
router.post("/add", studentController.addStudent);
router.get("/:id", studentController.viewStudent);
router.post("/update/:id", studentController.updateStudent);
router.get("/delete/:id", studentController.deleteStudent);

module.exports = router;
