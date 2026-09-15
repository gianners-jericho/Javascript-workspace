import db from '../config/db.js';

// Save a new feedback entry to the database
export const createFeedback = async (formData) => {
  const { name, course_title, score, reason } = formData;
  
  const query = 'INSERT INTO feedbacks (name, course_title, score, reason) VALUES (?, ?, ?, ?)';
  
  // Default optional name to 'Anonymous' if empty
  const [result] = await db.execute(query, [
    name || 'Anonymous', 
    course_title, 
    score, 
    reason
  ]);
  
  return result.insertId;
};

// Get a specific feedback submission by ID
export const getFeedbackById = async (id) => {
  const query = 'SELECT * FROM feedbacks WHERE id = ?';
  const [rows] = await db.execute(query, [id]);
  return rows[0];
};

// Get all feedback entries
export const getAllFeedbacks = async () => {
  const query = 'SELECT * FROM feedbacks ORDER BY created_at DESC';
  const [rows] = await db.execute(query);
  return rows;
};