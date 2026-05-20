const Student = require("../models/Student");

exports.getAllStudents = async (req, res) => {

    const search = req.query.search || "";

    const query = {
        $or: [
            { name: { $regex: search, $options: "i" } },
            { course: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } }
        ]
    };

    const students = await Student.find(query);

    res.render("index", { students, search });
};

exports.addStudentForm = (req, res) => {
    res.render("addStudent");
};

exports.addStudent = async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();

        res.redirect("/students");

    } catch (error) {

        res.send(error.message);
    }
};

exports.viewStudent = async (req, res) => {

    const student = await Student.findById(req.params.id);

    res.render("viewStudent", { student });
};

exports.editStudentForm = async (req, res) => {

    const student = await Student.findById(req.params.id);

    res.render("editStudent", { student });
};

exports.updateStudent = async (req, res) => {

    await Student.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/students");
};

exports.deleteStudent = async (req, res) => {

    await Student.findByIdAndDelete(req.params.id);

    res.redirect("/students");
};