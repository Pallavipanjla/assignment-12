const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/studentController');

router.get('/',           ctrl.getAllStudents);   // also handles ?name=&course=&city=
router.get('/add',        (req, res) => res.json({ message: 'Add student endpoint' }));
router.post('/add',       ctrl.addStudent);
router.get('/view/:id',   ctrl.getStudent);
router.get('/edit/:id',   ctrl.getStudent);       // returns data for editing
router.post('/update/:id',ctrl.updateStudent);
router.get('/delete/:id', ctrl.deleteStudent);

module.exports = router;
