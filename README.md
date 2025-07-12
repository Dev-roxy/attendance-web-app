# 🎓 Attendance Web App

[![Live Demo](https://img.shields.io/badge/Live_App-Vercel-brightgreen?style=flat-square)](https://amsweb-ten.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A full-stack, role-based web application for managing student attendance in universities. Designed using **Next.js** and **MongoDB**, it simplifies the attendance process for students, teachers, and administrators.

---

## 📌 Purpose

This system allows:
- **Admins** to register universities and approve/reject teacher applications.
- **Teachers** to create attendance sessions and export data.
- **Students** to mark attendance using session codes and location verification.

All attendance data can be exported as Excel files.

---

## 👥 User Roles

- **Admin**
  - Registers university
  - Reviews and approves teacher registration requests

- **Teacher**
  - Applies for registration under a university
  - After approval, logs in to create attendance sessions

- **Student**
  - Registers after university admin is active
  - Marks attendance using teacher ID + session code + location

---

## 🔐 Registration & Login Flow

1. **Admin registers** the university.
2. **Students** can register under the university after it's created.
3. **Teachers** apply for registration:
   - If **approved**, they gain access
   - If **rejected**, they see a login popup explaining the issue and can reapply

---

## 📋 Attendance Workflow

1. **Session Creation (Teacher)**
   - Teacher creates a session
   - A **unique session code** is generated

2. **Attendance Marking (Student)**
   - Student enters **teacher ID** + **session code**
   - Location is verified (based on GPS distance)

3. **Session Closure (Teacher)**
   - Teacher stops the session
   - Reviews student list and marks presence
   - Can export attendance as an **Excel sheet**

---

## ✅ Features

- 🔐 Secure registration/login for all roles
- 📨 Real-time popups for login/approval status
- 📍 Location-based attendance validation (lat/lng)
- 📊 Export attendance as Excel (via xlsx.js or SheetJS)
- 🎯 Role-based dashboard per user type
- 🚀 Built with modern, scalable technologies

---

## ⚙️ Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (or add here if used)
- **Backend:** Node.js + Next.js API Routes / Server Actions
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **Tools:** Postman, xlsx.js for Excel export

---

## 🛠️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/Dev-roxy/attendance-web-app.git
cd attendance-web-app

# 2. Install dependencies
npm install

# 3. Add environment variables
# Create a `.env.local` file with your MongoDB URI and secrets
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRE=1d
REFRESH_TOKEN_EXPIRE=7d
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Development Server

```bash
# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Live Demo

Check out the [live demo](https://amsweb-ten.vercel.app/) of the application deployed on Vercel.

## 🔧 Troubleshooting

### MongoDB Index Issues

If you encounter MongoDB index errors like `E11000 duplicate key error`, especially related to fields that don't exist in your current schema (e.g., `teacherId`), use the provided scripts:

- `fix-mongodb-index.js` - MongoDB shell commands to fix index issues
- `fix-teacher-index.js` - Node.js script to programmatically fix teacher collection indexes

Run the Node.js script:

```bash
node fix-teacher-index.js
```

Or execute the MongoDB shell commands directly in your database.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Dev-roxy">Dev-roxy</a>
</p>
