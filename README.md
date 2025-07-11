# 📚 Attendance Web App

A comprehensive web application for managing student attendance in educational institutions. Built with modern web technologies to provide a seamless experience for administrators, teachers, and students.

## 🎯 Purpose

The Attendance Web App is designed to streamline the process of tracking and managing student attendance in educational institutions. It replaces traditional paper-based attendance systems with a digital solution that offers real-time tracking, automated reporting, and role-based access control.

**Key Objectives:**
- Digitize attendance tracking for improved accuracy and efficiency
- Provide location-based attendance verification to prevent proxy attendance
- Enable real-time attendance monitoring for all stakeholders
- Generate comprehensive attendance reports and analytics
- Simplify administrative tasks related to attendance management

## 👥 User Roles

The application supports three distinct user roles, each with specific permissions and functionalities:

### 🔧 Administrator
- **Purpose**: System management and oversight
- **Key Features**:
  - User management (approve/reject teacher registrations)
  - System configuration and settings
  - Generate institution-wide attendance reports
  - Monitor system usage and performance
  - Manage student and teacher data

### 👨‍🏫 Teacher
- **Purpose**: Conduct classes and manage student attendance
- **Key Features**:
  - Create and manage attendance sessions
  - Mark attendance manually or enable location-based check-ins
  - View class-wise attendance reports
  - Monitor student attendance patterns
  - Export attendance data for analysis

### 🎓 Student
- **Purpose**: Check-in for classes and view attendance records
- **Key Features**:
  - Check-in to active attendance sessions
  - View personal attendance history
  - Track attendance percentage
  - Receive attendance notifications
  - Update profile information

## 🔐 Registration and Login Flows

### Student Registration
1. **Registration**: Students register using their enrollment number, personal details, and academic information
2. **Verification**: Automatic account activation upon successful registration
3. **Login**: Access using enrollment number and password
4. **Dashboard Access**: Immediate access to student dashboard and features

### Teacher Registration
1. **Registration**: Teachers register with enrollment number and professional details
2. **Approval Process**: Registration requires administrator approval
3. **Notification**: Teachers receive notification upon approval/rejection
4. **Login**: Access granted only after administrator approval
5. **Dashboard Access**: Full teacher functionality available post-approval

### Administrator Access
1. **Pre-configured**: Administrator accounts are typically pre-configured
2. **Login**: Direct access using admin credentials
3. **Full System Access**: Complete administrative privileges upon login

## 📋 Attendance Workflow

### For Teachers
1. **Session Creation**: Create an attendance session for a specific class/subject
2. **Session Configuration**: Set time limits and location parameters
3. **Session Activation**: Start the attendance session for students
4. **Monitoring**: Real-time monitoring of student check-ins
5. **Session Closure**: End the session and finalize attendance records
6. **Manual Override**: Option to manually mark attendance for absent students

### For Students
1. **Session Discovery**: View available active attendance sessions
2. **Location Verification**: System verifies student location against session parameters
3. **Check-in**: Students mark their attendance for the active session
4. **Confirmation**: Receive immediate confirmation of successful attendance
5. **History Tracking**: View attendance history and statistics

### Attendance Features
- **Location-Based Verification**: GPS coordinates ensure students are physically present
- **Time-Bound Sessions**: Attendance windows with start and end times
- **Real-Time Updates**: Live attendance status updates
- **Automatic Calculations**: Attendance percentage calculations
- **Report Generation**: Detailed attendance reports and analytics

## ✨ Feature Highlights

### 🌍 Location-Based Attendance
- GPS coordinate verification to prevent proxy attendance
- Configurable location radius for classroom boundaries
- Real-time location validation during check-in

### 📊 Real-Time Dashboard
- Live attendance statistics and analytics
- Role-specific dashboard views
- Interactive attendance monitoring
- Quick access to frequently used features

### 📱 Responsive Design
- Mobile-first design approach
- Cross-platform compatibility
- Optimized for various screen sizes
- Touch-friendly interface for mobile devices

### 🔒 Secure Authentication
- JWT-based authentication system
- Role-based access control
- Secure password hashing with bcrypt
- Session management with refresh tokens

### 📈 Comprehensive Reporting
- Detailed attendance reports
- Export functionality (Excel/CSV)
- Attendance trend analysis
- Class-wise and student-wise statistics

### ⚡ Performance Optimized
- Server-side rendering with Next.js
- Efficient database queries with MongoDB
- Optimized asset loading
- Fast page transitions

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.1.6**: React framework with App Router for server-side rendering
- **React 19**: Modern UI library with latest features
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful and consistent icon library
- **React Hook Form**: Performant form handling with minimal re-renders

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose 8.8.3**: Elegant MongoDB object modeling

### Authentication & Security
- **JSON Web Tokens (JWT)**: Secure token-based authentication
- **Jose**: JavaScript library for JWT operations
- **bcryptjs**: Password hashing and verification
- **Role-based Access Control**: Secure access management

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting
- **Cross-env**: Cross-platform environment variables

### Additional Libraries
- **XLSX**: Excel file processing for reports
- **Embla Carousel**: Smooth carousel components
- **Class Variance Authority**: Utility for managing CSS class variants

## 🚀 Setup Instructions

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **MongoDB**: Local installation or MongoDB Atlas account
- **Git**: For version control

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Dev-roxy/attendance-web-app.git
   cd attendance-web-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/attendance-db
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/attendance-db

   # JWT Configuration
   ACCESS_TOKEN_SECRET=your-access-token-secret-here
   REFRESH_TOKEN_SECRET=your-refresh-token-secret-here
   ACCESS_TOKEN_EXPIRE=15m
   REFRESH_TOKEN_EXPIRE=7d

   # Application Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here

   # Optional: Email Configuration (for notifications)
   EMAIL_SERVER_HOST=smtp.example.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@example.com
   EMAIL_SERVER_PASSWORD=your-email-password
   EMAIL_FROM=noreply@yourapp.com
   ```

4. **Database Setup**
   - **Local MongoDB**: Ensure MongoDB is running on your system
   - **MongoDB Atlas**: Create a cluster and get the connection string
   - The application will automatically create necessary collections on first run

5. **Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Database Schema
The application automatically creates the following collections:
- `admins`: Administrator accounts
- `teachers`: Teacher profiles and approval status
- `students`: Student profiles and academic information
- `attendances`: Attendance records with location data
- `sessions`: Attendance session configurations
- `approvals`: Teacher approval workflow data

### Initial Setup
1. Create an administrator account directly in the database or through the registration interface
2. Login as administrator to approve teacher registrations
3. Teachers can then create attendance sessions
4. Students can register and immediately start using the system

## 🤝 Contributing Guidelines

We welcome contributions from the community! Please follow these guidelines to ensure a smooth collaboration process.

### How to Contribute

1. **Fork the Repository**
   ```bash
   git fork https://github.com/Dev-roxy/attendance-web-app.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style and conventions
   - Write clear, concise commit messages
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   npm run lint
   npm run build
   npm run dev # Test functionality
   ```

5. **Submit a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all tests pass

### Code Style Guidelines

#### JavaScript/React
- Use ES6+ features and modern React patterns
- Follow the existing ESLint configuration
- Use meaningful variable and function names
- Write JSDoc comments for complex functions
- Prefer functional components with hooks

#### CSS/Styling
- Use Tailwind CSS classes for styling
- Follow mobile-first responsive design principles
- Maintain consistent spacing and typography
- Use semantic HTML elements

#### Database
- Follow MongoDB naming conventions
- Use appropriate data types and validation
- Add indexes for frequently queried fields
- Document schema changes

### Pull Request Process
1. **Review Requirements**: Ensure your PR meets all requirements
2. **Code Review**: Maintainers will review your code
3. **Address Feedback**: Make requested changes promptly
4. **Testing**: Verify that all tests pass
5. **Merge**: Once approved, your PR will be merged

### Reporting Issues
- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include error messages and screenshots
- Specify your environment (OS, browser, versions)

### Feature Requests
- Open an issue with the "enhancement" label
- Clearly describe the proposed feature
- Explain the use case and benefits
- Discuss implementation approach if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ **Commercial Use**: Use the software commercially
- ✅ **Modification**: Modify the source code
- ✅ **Distribution**: Distribute the software
- ✅ **Private Use**: Use the software privately
- ❗ **License and Copyright Notice**: Include the original license and copyright notice
- ❌ **Liability**: The software is provided "as is" without warranty
- ❌ **Warranty**: No warranty is provided with the software

### Third-Party Licenses
This project includes several open-source packages, each with their own licenses:
- Next.js (MIT License)
- React (MIT License)
- MongoDB/Mongoose (Apache 2.0 License)
- Tailwind CSS (MIT License)
- Other dependencies as listed in `package.json`

---

## 📞 Support

For questions, issues, or contributions, please:
- 🐛 **Report Bugs**: [GitHub Issues](https://github.com/Dev-roxy/attendance-web-app/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Dev-roxy/attendance-web-app/discussions)
- 📧 **Contact**: Open an issue for direct communication

## 🎉 Acknowledgments

- Next.js team for the amazing React framework
- MongoDB team for the flexible database solution
- The open-source community for the excellent libraries and tools
- All contributors who help improve this project

---

**Made with ❤️ for the education community**
