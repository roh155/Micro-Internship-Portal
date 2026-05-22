const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  // Link to the User who is submitting
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Link to the Task they are completing
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  
  githubRepoUrl: { type: String, required: true },
  
  status: { 
    type: String, 
    enum: ['Pending', 'Auto-Verified', 'Failed-Verification', 'Approved'], 
    default: 'Pending' 
  },
  
  feedback: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);