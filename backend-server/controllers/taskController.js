const Task = require('../models/Task');

// --- CREATE A NEW TASK (ADMIN ONLY) ---
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, difficulty } = req.body;

    const task = await Task.create({
      title,
      description,
      deadline,
      difficulty
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

// --- GET ALL TASKS (STUDENTS & ADMINS) ---
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 }); // Sort by closest deadline
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};