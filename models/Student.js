const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']      // validation
  },
  rollno: {
    type: Number,
    unique: true                               // no duplicates
  },
  course: String,
  age: {
    type: Number,
    min: [16, 'Age must be greater than 15']  // validation
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] // validation
  },
  city: String
});

module.exports = mongoose.model('Student', studentSchema);
