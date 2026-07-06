💰 Loan Management System (LMS)

A robust full-stack Loan Management System that enables secure loan application, approval, tracking, and payment processing. The platform supports multiple user roles (Admin, Manager, and Borrower) with role-based access control, real-time loan management, and an intuitive dashboard experience.    
  
🔗 Live Demo

🌐 Live Site: https://loanlink2002.netlify.app    
 
🚀 Features
👨‍💼 Admin & Manager Features 
👥 User Management
View all registered users
Search and filter users
Manage user roles (Admin, Manager, Borrower)
Monitor user activity  
🚫 User Suspension System
Suspend users when necessary  
Provide suspension reasons and feedback
Restrict access for suspended accounts
🏦 Loan Package Management 
Create new loan packages
Update loan information
Delete loan packages
Toggle "Show on Home" visibility
📊 Analytics Dashboard
Revenue visualization using Recharts
Loan distribution statistics
Application tracking overview
Interactive charts and reports
👤 Borrower Features
📋 Personalized Dashboard
View applied loans
Track loan application status 
Monitor payment history
📝 Loan Application
Multi-step application process
Auto-filled user information
Easy and user-friendly form submission
💳 Secure Payments
Pay the $10 application fee via Stripe
Secure payment processing
Instant payment confirmation
🔔 Real-Time Notifications
Success and error notifications using:
React Hot Toast
SweetAlert2
🛠️ Tech Stack
Frontend
Technology	Description
React 19	UI Development
Vite	Build Tool
Tailwind CSS 4	Styling Framework
Headless UI	Accessible UI Components
React Router 7	Client-Side Routing
TanStack Query v5	Server State Management
Framer Motion	Animations
Recharts	Data Visualization
React Icons	Icon Library
Backend
Technology	Description
Node.js	Runtime Environment
Express.js	Backend Framework
MongoDB	Database
Firebase Authentication	User Authentication
JSON Web Token (JWT)	Authorization
Stripe API	Payment Processing
🔐 Authentication & Authorization

The application supports:

Admin Authentication
Manager Authentication
Borrower Authentication
Protected Routes
Role-Based Access Control (RBAC)
JWT-Based Authorization
Firebase Authentication
⚙️ Environment Variables

Create a .env file in the root directory and add the following variables:

VITE_API_URL=http://localhost:3000

VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
📦 Installation
Clone the Repository
git clone https://github.com/your-username/loan-management-system.git
Navigate to the Project
cd loan-management-system
Install Dependencies
npm install
Configure Environment Variables

Create a .env file and add the required environment variables.

Start Development Server
npm run dev

The application will run at:

http://localhost:5173
🗂️ User Roles
Role	Permissions
Admin	Full system access
Manager	Manage loans and users
Borrower	Apply for loans and make payments 
📈 Core Functionalities

✅ User Registration & Login

✅ Role-Based Authorization

✅ Loan Application System

✅ Loan Status Tracking

✅ Secure Stripe Payment Integration

✅ Dashboard Analytics

✅ User Suspension Management

✅ Loan Package CRUD Operations

✅ Real-Time Notifications

✅ Responsive Design

🔒 Security Features
Firebase Authentication
JWT Authorization
Protected API Routes
Role-Based Access Control
Secure Stripe Payment Processing
Environment Variable Protection
🤝 Contributing

Contributions are welcome!

Fork the repository
Create a feature branch
git checkout -b feature-name
Commit your changes
git commit -m "Add new feature"
Push to GitHub
git push origin feature-name
Open a Pull Request
📄 License

This project is licensed under the MIT License.

👨‍💻 Developed With
React
Node.js
Express.js
MongoDB
Firebase
Stripe
Tailwind CSS
TanStack Query

⭐ If you like this project, consider giving it a star on GitHub!
