## Micro-Internship Portal 🚀

A comprehensive Full-Stack MERN application designed to streamline the internship submission and verification process for students and mentors.

## 💡 Why This Project Helps
This portal solves real-world challenges for both students and instructors:

### For Students
* **Skill Validation:** An instant platform to test technical skills on live projects.
* **Instant Feedback:** Automated verification removes the waiting time for manual reviews.
* **Industry Readiness:** Experience standard industry workflows like GitHub integration and API usage.

### For Instructors/Mentors
* **Automated Tracking:** Eliminates manual checking of hundreds of emails.
* **Error Reduction:** Automatically validates repository links, ensuring only high-quality submissions.
* **Centralized Dashboard:** Organizes all submissions in one place for easy grading.

## 🛠 Tech Stack
* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JSON Web Tokens (JWT)
* **APIs:** GitHub REST API (for repository validation)

## ⚙️ Deployment
* **Frontend:** Hosted on **Cloudflare Pages** for high-speed global delivery.
* **Backend:** Hosted on **Render** (Node.js server with secure CORS configuration).

## 🌐 Live Demo
**Check out the project live here: https://micro-internship-portal-live.pages.dev**

## 📂 Project Structure
```text
micro-internship-portal/
├── frontend-client/        # React frontend
│   ├── src/                # Components, Pages, and Hooks
│   └── dist/               # Production build
├── backend-server/         # Node.js backend
│   ├── controllers/        # Logic handlers
│   ├── models/             # MongoDB Schema
│   └── server.js           # Main Entry Point
└── .env                    # Environment Config
```

## 🚀 How It Works
---
**Authentication:** Secure JWT-based login/signup.

**Submission:** Students submit their GitHub repository links.

**Validation:** The backend uses the GitHub API to check repository validity in real-time.

**Auto-Verification:** Successful submissions are automatically saved to MongoDB Atlas.

Developed by: Rohit Baheshwar

Status: Live and Operational 🌐
