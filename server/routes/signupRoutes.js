const express = require('express');
const router = express.Router();
const SignupForm = require('../models/SignupForm');

// @route   POST /api/signup
// @desc    Submit a new signup form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, interest, message } = req.body;

    // Create new submission
    const newSubmission = new SignupForm({
      name,
      email,
      interest,
      message
    });

    // Save to database
    const savedSubmission = await newSubmission.save();
    
    res.status(201).json({
      success: true,
      message: 'Signup form submitted successfully',
      data: savedSubmission
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error submitting form',
      error: error.message
    });
  }
});

module.exports = router;