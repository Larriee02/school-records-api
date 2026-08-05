# School Record Management API

A RESTful API built with **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize ORM** for managing school records. The system provides secure authentication, role-based authorization, student management, teacher management, attendance tracking, class and subject management, and result processing.

---

# Features

## Authentication & Authorization

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Role-based authorization (Admin, Teacher)

## Student Management

- Create student
- View all students
- View student by ID
- Update student
- Delete student
- Search students
- Assign students to classes

## Teacher Management

- Create teacher profile
- View all teachers
- View teacher by ID
- Update teacher
- Delete teacher

## Class Management

- Create class
- View classes
- Update class
- Delete class
- View students in a class

## Subject Management

- Create subject
- Update subject
- Delete subject
- Assign teacher to subject

## Attendance Management

- Mark attendance
- View attendance
- Update attendance
- Delete attendance
- View attendance history

## Result Management

- Record student results
- Update results
- Delete results
- Generate student transcript
- Generate report cards
- Automatic grade calculation

## Email Notifications

- Welcome emails
- Result notification emails
- Password reset email template

---

# Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- Nodemailer
- dotenv

---

# Project Structure

```text
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

## 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

```bash
cd school-records-api
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_record_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=example@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM="School Record Management" <example@gmail.com>
```

---

## 4. Create PostgreSQL Database

Create a PostgreSQL database named:

```
school_record_db
```

---

## 5. Start the Server

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

Protected endpoints require a JWT access token.

Example:

```
Authorization: Bearer <your_token>
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
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |

---

## Students

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/students` | Create student |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get student by ID |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |
| GET | `/students/search` | Search students |
| GET | `/students/class/:classId` | Get students by class |

---

## Teachers

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/teachers` | Create teacher |
| GET | `/teachers` | Get all teachers |
| GET | `/teachers/:id` | Get teacher by ID |
| PUT | `/teachers/:id` | Update teacher |
| DELETE | `/teachers/:id` | Delete teacher |

---

## Classes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/classes` | Create class |
| GET | `/classes` | Get all classes |
| GET | `/classes/:id` | Get class by ID |
| PUT | `/classes/:id` | Update class |
| DELETE | `/classes/:id` | Delete class |
| GET | `/classes/:id/students` | View students in a class |

---

## Subjects

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/subjects` | Create subject |
| GET | `/subjects` | Get all subjects |
| GET | `/subjects/:id` | Get subject by ID |
| PUT | `/subjects/:id` | Update subject |
| DELETE | `/subjects/:id` | Delete subject |
| PATCH | `/subjects/:id/assign-teacher` | Assign teacher to subject |

---

## Attendance

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/attendance` | Mark attendance |
| GET | `/attendance` | Get all attendance records |
| GET | `/attendance/:id` | Get attendance by ID |
| PUT | `/attendance/:id` | Update attendance |
| DELETE | `/attendance/:id` | Delete attendance |
| GET | `/attendance/student/:studentId` | Get attendance history for a student |

---

## Results

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/results` | Record result |
| GET | `/results/:id` | Get result by ID |
| PUT | `/results/:id` | Update result |
| DELETE | `/results/:id` | Delete result |
| GET | `/results/transcript/:studentId` | Get student transcript |
| GET | `/results/report-card/:studentId/:term/:session` | Generate report card |

---

# Database Models

The application uses PostgreSQL with Sequelize ORM.

Main models:

- User
- Teacher
- Student
- Class
- Subject
- Attendance
- Result

Relationships:

- One User → One Teacher
- One Class → Many Students
- One Teacher → Many Subjects
- One Student → Many Attendance Records
- One Student → Many Results
- One Subject → Many Results

---

# Error Handling

The API uses a centralized global error handler.

Example response:

```json
{
  "success": false,
  "message": "Student not found."
}
```

---

# Team Members

## Osondu Gabriel

**Responsibilities**

- Database configuration
- Sequelize models
- Authentication
- Authorization
- Student management
- Attendance management
- API documentation

---

## Sanni

**Responsibilities**

- Teacher management
- Class management
- Subject management
- Result management
- Email service
- Project documentation

---

# Future Improvements

- Pagination
- Advanced filtering
- Student dashboard
- Parent accounts
- File uploads
- PDF report card generation
- Swagger/OpenAPI documentation
- Unit testing
- Integration testing

---

# License

This project was developed for educational purposes.