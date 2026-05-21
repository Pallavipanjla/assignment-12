const Student = require('../models/Student');

// GET all students
exports.getAllStudents = async (req, res) => {
  try {
    const { name, course, city } = req.query; // for search
    let filter = {};
    if (name)   filter.name   = new RegExp(name, 'i');
    if (course) filter.course = new RegExp(course, 'i');
    if (city)   filter.city   = new RegExp(city, 'i');

    const students = await Student.find(filter);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add student
exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student added', student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // return updated doc + re-run validations
    );
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student updated', student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
