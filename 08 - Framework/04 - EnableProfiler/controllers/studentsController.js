import bcrypt from 'bcryptjs';
import StudentModel from '../models/studentModel.js';

// Render Form Page
export const renderAuthForm = (req, res) => {
  res.render('index');
};

// Process Registration
export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, confirm_password } = req.body;
    const errors = [];

    // Validations
    if (!first_name || !last_name || !email || !password) {
      errors.push('All fields are required.');
    }
    if (password !== confirm_password) {
      errors.push('Passwords do not match.');
    }
    
    // Check Email Duplicate
    const existingStudent = await StudentModel.findByEmail(email, req.profiler);
    if (existingStudent) {
      errors.push('An account with this email already exists.');
    }

    if (errors.length > 0) {
      req.flash('error', errors);
      return res.redirect('/');
    }

    // Hash Password & Save
    const hashedPassword = await bcrypt.hash(password, 10);
    const studentId = await StudentModel.createStudent({
      first_name,
      last_name,
      email,
      password: hashedPassword
    }, req.profiler);

    // Auto-login session
    req.session.student = { id: studentId, first_name, last_name, email };
    res.redirect('/students/profile');

  } catch (err) {
    next(err);
  }
};

// Process Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash('error', 'Email and password are required.');
      return res.redirect('/');
    }

    const student = await StudentModel.findByEmail(email, req.profiler);
    if (!student) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/');
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/');
    }

    // Set Session
    req.session.student = {
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email
    };

    res.redirect('/students/profile');

  } catch (err) {
    next(err);
  }
};

// Profile Page
export const renderProfile = async (req, res, next) => {
  try {
    // Fetch fresh student data from DB and pass req.profiler
    const student = await StudentModel.findById(req.session.student.id, req.profiler);
    
    res.render('profile', { student });
  } catch (err) {
    next(err);
  }
};

// Log Off
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};