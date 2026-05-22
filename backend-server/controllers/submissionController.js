const Submission = require('../models/Submission');
const axios = require('axios'); // We use axios to talk to the GitHub API

// --- SUBMIT AND VERIFY TASK ---
exports.submitTask = async (req, res) => {
  try {
    const { studentId, taskId, githubRepoUrl } = req.body;

    // 1. Create a new submission in the database with a "Pending" status
    const newSubmission = await Submission.create({
      studentId,
      taskId,
      githubRepoUrl,
      status: 'Pending'
    });

    // 2. Extract the username and repo name from the GitHub link
    // Example: https://github.com/username/repo -> "username/repo"
    const urlParts = githubRepoUrl.split('github.com/');
    
    // If the link is not a valid GitHub link, fail it immediately
    if (urlParts.length < 2) {
      newSubmission.status = 'Failed-Verification';
      newSubmission.feedback = 'Invalid GitHub URL format. Please provide a correct link.';
      await newSubmission.save();
      return res.status(400).json({ message: 'Invalid GitHub URL format.', submission: newSubmission });
    }

    const repoPath = urlParts[1].replace('.git', ''); // clean up the string

    // 3. Ask the GitHub API if this repository exists
    try {
      const githubApiUrl = `https://api.github.com/repos/${repoPath}`;
      
      // Make a GET request to GitHub
      const response = await axios.get(githubApiUrl);

      // If GitHub says 200 OK, the repo exists!
      if (response.status === 200) {
        newSubmission.status = 'Auto-Verified';
        newSubmission.feedback = 'Great job! Repository found successfully.';
      }
    } catch (githubError) {
      // If GitHub returns an error (like 404 Not Found)
      newSubmission.status = 'Failed-Verification';
      newSubmission.feedback = 'Repository not found. Please check your link or make sure the repo is Public.';
    }

    // 4. Save the final verified status to the database
    await newSubmission.save();

    // 5. Send the result back to the frontend
    res.status(200).json(newSubmission);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during submission' });
  }
};
// --- GET ALL SUBMISSIONS (ADMIN ONLY) ---
exports.getAllSubmissions = async (req, res) => {
  try {
    // Find all submissions, populate student name/email and task details, sort by newest first
    const submissions = await Submission.find()
      .populate('studentId', 'name email')
      .populate('taskId', 'title difficulty')
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};