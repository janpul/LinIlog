const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const SignupForm = require('../models/SignupForm');

// @route   POST /api/admin/register
// @desc    Register a new admin
// @access  Public (ideally should be restricted)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if admin already exists
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin with this username already exists' 
      });
    }
    
    // Create new admin
    admin = new Admin({
      username,
      password
    });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    
    await admin.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Admin registered successfully' 
    });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering admin', 
      error: error.message 
    });
  }
});

// @route   POST /api/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Generate JWT
    const payload = {
      id: admin._id
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'linilog_secret_key',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          success: true, 
          token,
          message: 'Login successful'
        });
      }
    );
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in', 
      error: error.message 
    });
  }
});

// @route   GET /api/admin/submissions
// @desc    Get all signup form submissions
// @access  Private (admin only)
router.get('/submissions', auth, async (req, res) => {
  try {
    const submissions = await SignupForm.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: submissions.length,
      submissions 
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching submissions', 
      error: error.message 
    });
  }
});

module.exports = router;