# 🎓 Attendance Web App

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

# 4. Run the development server
npm run dev
