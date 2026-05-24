****🚀 **Micro-Internship Portal**

Welcome to the Micro-Internship Portal! This is a full-stack MERN application designed to help students discover and apply for micro-internships, featuring an automated verification system for project submissions.

💡 How This Project Helps
This portal solves several real-world challenges for both students and instructors:

For Students: * Skill Validation: It provides an instant platform for students to test their technical skills on live projects.

Instant Feedback: Instead of waiting for manual review, students get immediate "Auto-Verification," which boosts confidence and reduces waiting time.

Industry Readiness: By working with GitHub repositories and Node.js servers, students learn the standard industry workflow for project submissions.

For Instructors/Mentors:

Automated Tracking: It eliminates the need to manually check hundreds of student emails or Google Forms.

Error Reduction: The system automatically validates links, ensuring that only accessible and relevant repositories are submitted.

Seamless Workflow: It organizes all submissions in a centralized database, making it easier to track progress and grade tasks.
🚀 Project Overview
This portal allows students to register, login, and submit their GitHub repository links for internship tasks. The system automatically verifies if the repository is valid and provides instant feedback to the student.

🛠 Tech Stack
Frontend: React.js, Tailwind CSS (for styling)

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JSON Web Tokens (JWT)

Deployment: * Frontend: Cloudflare Pages

Backend: Render

APIs Used: GitHub REST API (for repository validation)

📂 Project Structure
Plaintext
micro-internship-portal/
├── frontend-client/        # React frontend application
│   ├── src/components/     # UI components (Login, Register, Dashboard)
│   ├── src/pages/          # Main application pages
│   └── dist/               # Build folder (Deployed on Cloudflare)
├── backend-server/         # Node.js backend server
│   ├── controllers/        # Logic for user auth and submissions
│   ├── models/             # MongoDB Schemas (User, Submission)
│   └── server.js           # Main entry point & CORS configuration
└── .env                    # Environment variables (DB URI, JWT Secret)
⚙️ How It Works
Authentication: Users register and login via a secure JWT-based system.

Submission: Users provide a GitHub repository link on the dashboard.

Validation: The backend calls the GitHub API to check if the repository exists and belongs to the user.

Auto-Verification: Upon success, the system stores the submission in MongoDB and returns a success message to the UI.

🚀 Deployment Details
Frontend: The React project is built and the static dist/ folder is hosted on Cloudflare Pages for global, high-speed delivery.

Backend: The Node.js server is hosted on Render, which handles API requests and database operations.

CORS Configuration: Backend is configured to accept requests only from the production frontend URL (https://micro-internship-portal-live.pages.dev).

🔑 Environment Variables
To run this project locally, ensure you have the following in your .env file:

MONGODB_URI: Your MongoDB Atlas connection string.

JWT_SECRET: A secure secret key for token signing.

Author: Rohit Baheshwar

Status: Live and Operational
****
