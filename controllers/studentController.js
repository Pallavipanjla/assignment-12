const Student = require("../models/Student");

// GET /students
// GET /students?search=keyword
exports.getAllStudents = async (req, res) => {
    try {
        const search = req.query.search || "";

        const query = search ? {
            $or: [
                { name:   { $regex: search, $options: "i" } },
                { course: { $regex: search, $options: "i" } },
                { city:   { $regex: search, $options: "i" } }
            ]
        } : {};

        const students = await Student.find(query);
        res.status(200).json({ success: true, count: students.length, data: students });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /students/add
exports.addStudent = async (req, res) => {
    try {
        const existingRoll = await Student.findOne({ rollno: req.body.rollno });
        if (existingRoll) {
            return res.status(400).json({ success: false, message: "Roll number already exists." });
        }

        const existingEmail = await Student.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email already exists." });
        }

        const student = new Student(req.body);
        await student.save();

        res.status(201).json({ success: true, message: "Student added successfully.", data: student });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /students/:id
exports.viewStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found." });
        }

        res.status(200).json({ success: true, data: student });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /students/update/:id
exports.updateStudent = async (req, res) => {
    try {
        const existingEmail = await Student.findOne({
            email: req.body.email,
            _id: { $ne: req.params.id }
        });

        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email already registered to another student." });
        }

        const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Student not found." });
        }

        res.status(200).json({ success: true, message: "Student updated successfully.", data: updated });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /students/delete/:id
exports.deleteStudent = async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Student not found." });
        }

        res.status(200).json({ success: true, message: "Student deleted successfully." });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
