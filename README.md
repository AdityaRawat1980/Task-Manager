Task Manager with JWT & Email OTP Verification

A secure full-stack Task Manager web application built using:

Node.js
Express.js
MongoDB Atlas
EJS
JWT Authentication
Email OTP Verification
Render Deployment

This project demonstrates real-world authentication, secure user management, and task CRUD operations.

Features

-Authentication
-User Signup
-Email OTP Verification
-Resend OTP
-Secure Login (JWT)
-HTTP-only cookies
-Password hashing (bcrypt)
-Account verification required before login

Task Management

- Add Task
- Edit Task
- Delete Task
- Mark as Completed / Pending
- User-specific task isolation

Security Features

- JWT Authentication
- OTP Expiration (5 minutes)
- Environment variables for secrets
- Middleware-protected routes
- MongoDB Atlas cloud database


Project Structure

TASK-MANAGER
│
├── middleware
│ └── auth.js
│
├── schema
│ ├── userSchema.js
│ └── taskSchema.js
│
├── verify
│ └── sendMail.js
│
├── views
│ ├── Home.ejs
│ ├── Login.ejs
│ ├── Signup.ejs
│ ├── Verify.ejs
│ └── EditTask.ejs
│
├── public
│ └── css
│ ├── home.css
│ ├── auth.css
│ └── verify.css
│
├── .gitignore
├── package.json
├── package-lock.json
|── Server.js
|──.env
|──node_modules

Database Design

User Schema

```json
{
  "email": "string",
  "username": "string",
  "password": "hashed string",
  "isVerified": "boolean",
  "otp": "string",
  "otpExpiry": "date"
}
Task Schema
{
  "title": "string",
  "description": "string",
  "status": "pending/completed",
  "userId": "ObjectId"
}
```
Authentication Flow
(1) Signup

Password hashed using bcrypt

6-digit OTP generated

OTP sent to registered email

User redirected to verification page

(2️) OTP Verification

OTP checked for validity

Expiry verified (5 minutes)

Account activated

(3️) Login

Password validated

Account verification checked

JWT token generated

Stored in HTTP-only cookie

Access granted to dashboard

- Installation (Local Setup)

(1️) Clone the repository

git clone https://github.com/AdityaRawat1980/Task-Manager.git
cd Task-Manager

(2️) Install dependencies

npm install

(3️) Create .env file and add required environment variables.

(4️) Run the server

nodemon Server.js

Visit:

/signup 

Deployment

The application is deployed using:

MongoDB Atlas (Cloud Database)

Render (Node.js Hosting)


Technologies Used

Node.js

Express.js

MongoDB Atlas

Mongoose

EJS

JWT (jsonwebtoken)

bcrypt

Nodemailer

HTML5

CSS3

(Future Improvements)

Forgot Password System

OTP Attempt Limit

Rate Limiting

Hash OTP in Database

Role-Based Access Control

Author

Aditya Rawat
BCA Student | Full Stack Developer

GitHub: https://github.com/AdityaRawat1980
