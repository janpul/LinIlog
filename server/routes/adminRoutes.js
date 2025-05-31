const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const SignupForm = require('../models/SignupForm');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin with this username already exists' 
      });
    }
    
    admin = new Admin({
      username,
      password
    });
    
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

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
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

// Get a single submission
router.get('/submissions/:id', auth, async (req, res) => {
  try {
    const submission = await SignupForm.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      submission
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submission',
      error: error.message
    });
  }
});

// Update submission status
router.put('/submissions/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be pending, accepted, or rejected.'
      });
    }
    
    const submission = await SignupForm.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    submission.status = status;
    await submission.save();
    
    res.status(200).json({
      success: true,
      message: `Submission status updated to ${status}`,
      submission
    });
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating submission status',
      error: error.message
    });
  }
});

// Delete submission
router.delete('/submissions/:id', auth, async (req, res) => {
  try {
    const submission = await SignupForm.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    await SignupForm.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting submission',
      error: error.message
    });
  }
});

module.exports = router;