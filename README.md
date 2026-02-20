Task Manager with JWT & Email OTP Verification

A secure, production-ready full-stack Task Manager web application implementing modern authentication and authorization practices using JWT, Email OTP verification, and MongoDB Atlas.

This project demonstrates real-world backend architecture, secure authentication flow, middleware protection, and user-specific task isolation.

Live Demo:
https://task-manager-1-ip8b.onrender.com

Project Overview

This application allows users to securely:

Register with email verification (OTP-based)

Authenticate using JWT (HTTP-only cookies)

Manage personal tasks

Perform full CRUD operations

Access protected routes securely

Built following modern backend security best practices.


Tech Stack

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT (jsonwebtoken)

bcrypt

Nodemailer

Frontend

EJS (Templating Engine)

HTML5

CSS3

Deployment

Render (Cloud Hosting)

MongoDB Atlas (Cloud Database)

Core Features
Authentication & Authorization

User Signup with email OTP verification

Resend OTP functionality

Secure Login with JWT

HTTP-only cookies for token storage

Password hashing using bcrypt

Account verification required before login

Middleware-protected routes

Task Management

Add Task

Edit Task

Delete Task

Toggle Task Status (Pending / Completed)

User-specific task isolation

Secure ownership validation

Security Implementation

JWT-based authentication

OTP expiration (5 minutes validity)

Environment variables for sensitive credentials

Middleware route protection

MongoDB Atlas secured cluster

Password hashing with bcrypt

HTTP-only cookies (prevent XSS token access)

Project Structure
TASK-MANAGER
│
├── middleware
│   └── auth.js
│
├── schema
│   ├── userSchema.js
│   └── taskSchema.js
│
├── verify
│   └── sendMail.js
│
├── views
│   ├── Home.ejs
│   ├── Login.ejs
│   ├── Signup.ejs
│   ├── Verify.ejs
│   └── EditTask.ejs
│
├── public
│   └── css
│       ├── home.css
│       ├── auth.css
│       └── verify.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── Server.js

Database Schema Design
User Schema
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


Authentication Flow
1️ Signup

Password hashed using bcrypt

6-digit OTP generated

OTP sent to registered email

User redirected to verification page

2️ OTP Verification

OTP validated

Expiry checked (5 minutes)

Account activated

3️ Login

Password verified

Account verification checked

JWT token generated

Stored in an HTTP-only cookie

Access granted to the dashboard


Deployment

MongoDB Atlas (Cloud Database)

Render (Node.js Hosting)


Future Improvements

Forgot Password System

OTP Attempt Limit

Rate Limiting

Hash OTP in Database

Role-Based Access Control

Refresh Token Implementation


Author

Aditya Rawat
BCA Student | Full Stack Developer

GitHub:
https://github.com/AdityaRawat1980
