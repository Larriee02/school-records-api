# School Record Management API

A RESTful API built with **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize ORM** for managing school records. The system provides secure authentication, role-based authorization, student management, teacher management, attendance tracking, class and subject management, and result processing.

---

## Features

### Authentication & Authorization
- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Role-based authorization (Admin, Teacher)

### Student Management
- Create student
- View all students
- View student by ID
- Update student
- Delete student
- Search students
- Assign students to classes

### Teacher Management
- Create teacher profile
- View all teachers
- View teacher by ID
- Update teacher
- Delete teacher

### Class Management
- Create class
- View classes
- Update class
- Delete class
- View students in a class

### Subject Management
- Create subject
- Update subject
- Delete subject
- Assign teacher to subject

### Attendance Management
- Mark attendance
- View attendance
- Update attendance
- Delete attendance
- View attendance history

### Result Management
- Record student results
- Update results
- Delete results
- Generate student transcript
- Generate report card
- Automatic grade calculation

### Email Notifications
- Welcome emails
- Result notification emails
- Password reset email template

---

# Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- Nodemailer
- dotenv

---

# Project Structure

```
school-records-api/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── docs/
│
├── app.js
├── package.json
├── .env
└── README.md
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/your-repository.git
```

```bash
cd school-records-api
```

---

## Install dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_record_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=example@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM="School Record Management" <example@gmail.com>
```

---

## Create PostgreSQL Database

Create a PostgreSQL database named:

```
school_record_db
```

---

## Run the Project

Development mode

```bash
npm run dev
```

Production mode

```bash
npm start
```

---

# API Base URL

```
http://localhost:3000/api/v1
```

---

# Authentication

Protected routes require a JWT token.

Example:

```
Authorization: Bearer your_jwt_token
```

---

# User Roles

- Admin
- Teacher

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |

---

## Students

| Method | Endpoint |
|---------|----------|
| POST | /students |
| GET | /students |
| GET | /students/:id |
| PUT | /students/:id |
| DELETE | /students/:id |
| GET | /students/search |
| GET | /students/class/:classId |

---

## Teachers

| Method | Endpoint |
|---------|----------|
| POST | /teacher |
| GET | /teacher |
| GET | /teacher/:id |
| PUT | /teacher/:id |
| DELETE | /teacher/:id |

---

## Classes

| Method | Endpoint |
|---------|----------|
| POST | /class |
| GET | /class |
| GET | /class/:id |
| PUT | /class/:id |
| DELETE | /class/:id |
| GET | /class/:id/students |

---

## Subjects

| Method | Endpoint |
|---------|----------|
| POST | /subject |
| GET | /subject |
| GET | /subject/:id |
| PUT | /subject/:id |
| DELETE | /subject/:id |
| PATCH | /subject/:id/assign-teacher |

---

## Attendance

| Method | Endpoint |
|---------|----------|
| POST | /attendance |
| GET | /attendance |
| GET | /attendance/:id |
| PUT | /attendance/:id |
| DELETE | /attendance/:id |
| GET | /attendance/student/:studentId |

---

## Results

| Method | Endpoint |
|---------|----------|
| POST | /result |
| GET | /result/:id |
| PUT | /result/:id |
| DELETE | /result/:id |
| GET | /result/transcript/:studentId |
| GET | /result/report-card/:studentId/:term/:session |

---

# Database

The application uses PostgreSQL with Sequelize ORM.

Main entities include:

- Users
- Teachers
- Students
- Classes
- Subjects
- Attendance
- Results

Relationships:

- One User → One Teacher
- One Class → Many Students
- One Teacher → Many Subjects
- One Student → Many Attendance Records
- One Student → Many Results
- One Subject → Many Results

---

# Error Handling

A global error handler is used throughout the application.

Typical responses include:

```json
{
    "success": false,
    "message": "Student not found."
}
```

---

# Team Members

### Osondu Gabriel

Responsibilities

- Database Setup
- Sequelize Models
- Authentication
- Authorization
- Student Management
- Attendance Management
- API Documentation

---

### Sanni

Responsibilities

- Teacher Management
- Class Management
- Subject Management
- Result Management
- Email Service
- README Documentation

---

# Future Improvements

- Pagination
- Filtering
- Student dashboard
- Parent accounts
- File uploads
- Report card PDF generation
- Swagger/OpenAPI documentation
- Unit and integration testing

---

# License

This project is intended for educational purposes.