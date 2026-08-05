# School Record Management API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

---

# Authentication

Most endpoints require authentication.

Include the JWT access token in the request header.

```
Authorization: Bearer <your_jwt_token>
```

---

# Authentication Endpoints

## Register User

**POST**

```
/auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

### Success Response

**201 Created**

```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

---

## Login

**POST**

```
/auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "<jwt_token>"
}
```

---

# Student Endpoints

## Create Student

**POST**

```
/students
```

**Authorization**

Admin

### Request Body

```json
{
  "firstName": "Gabriel",
  "lastName": "Osondu",
  "gender": "Male",
  "dateOfBirth": "2005-04-16",
  "admissionNumber": "ST001",
  "classId": "class_uuid",
  "email": "student@example.com"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Student created successfully.",
  "data": {}
}
```

---

## Get All Students

**GET**

```
/students
```

Returns all students.

---

## Get Student By ID

**GET**

```
/students/:id
```

Returns one student.

---

## Update Student

**PUT**

```
/students/:id
```

Update any student information.

---

## Delete Student

**DELETE**

```
/students/:id
```

Deletes a student.

---

## Search Students

**GET**

```
/students/search?keyword=Gabriel
```

Returns matching students.

---

## Get Students By Class

**GET**

```
/students/class/:classId
```

Returns students belonging to a class.

---

# Teacher Endpoints

## Create Teacher

**POST**

```
/teachers
```

### Request Body

```json
{
  "userId": "user_uuid",
  "staffId": "T001",
  "department": "Science",
  "phone": "677000000",
  "qualification": "B.Sc"
}
```

---

## Get All Teachers

**GET**

```
/teachers
```

Supports pagination.

Example:

```
/teachers?page=1&limit=10
```

---

## Get Teacher

**GET**

```
/teachers/:id
```

---

## Update Teacher

**PUT**

```
/teachers/:id
```

---

## Delete Teacher

**DELETE**

```
/teachers/:id
```

---

# Class Endpoints

## Create Class

**POST**

```
/classes
```

### Request Body

```json
{
  "className": "Form 5",
  "classLevel": "Secondary"
}
```

---

## Get All Classes

**GET**

```
/classes
```

---

## Get Class By ID

**GET**

```
/classes/:id
```

---

## Update Class

**PUT**

```
/classes/:id
```

---

## Delete Class

**DELETE**

```
/classes/:id
```

---

## View Students In Class

**GET**

```
/classes/:id/students
```

---

# Subject Endpoints

## Create Subject

**POST**

```
/subjects
```

### Request Body

```json
{
  "subjectName": "Mathematics",
  "subjectCode": "MTH101"
}
```

---

## Get All Subjects

**GET**

```
/subjects
```

---

## Get Subject

**GET**

```
/subjects/:id
```

---

## Update Subject

**PUT**

```
/subjects/:id
```

---

## Delete Subject

**DELETE**

```
/subjects/:id
```

---

## Assign Teacher

**PATCH**

```
/subjects/:id/assign-teacher
```

### Request Body

```json
{
  "teacherId": "teacher_uuid"
}
```

---

# Attendance Endpoints

## Mark Attendance

**POST**

```
/attendance
```

### Request Body

```json
{
  "studentId": "student_uuid",
  "date": "2026-08-06",
  "status": "Present"
}
```

Status values:

* Present
* Absent
* Late

---

## Get All Attendance

**GET**

```
/attendance
```

---

## Get Attendance By ID

**GET**

```
/attendance/:id
```

---

## Get Attendance History

**GET**

```
/attendance/student/:studentId
```

---

## Update Attendance

**PUT**

```
/attendance/:id
```

---

## Delete Attendance

**DELETE**

```
/attendance/:id
```

---

# Result Endpoints

## Record Result

**POST**

```
/results
```

### Request Body

```json
{
  "studentId": "student_uuid",
  "subjectId": "subject_uuid",
  "score": 82
}
```

---

## Get Result

**GET**

```
/results/:id
```

---

## Update Result

**PUT**

```
/results/:id
```

### Request Body

```json
{
  "score": 90
}
```

---

## Delete Result

**DELETE**

```
/results/:id
```

---

## Student Transcript

**GET**

```
/results/transcript/:studentId
```

Returns every result for the student.

---

## Generate Report Card

**GET**

```
/results/report-card/:studentId
```

Returns the student's report card.

---

# Common HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Resource Not Found    |
| 409  | Conflict              |
| 422  | Validation Error      |
| 500  | Internal Server Error |

---

# Error Response Format

```json
{
  "success": false,
  "message": "Student not found."
}
```

Validation errors:

```json
{
  "success": false,
  "errors": [
    {
      "path": "email",
      "msg": "Invalid email address."
    }
  ]
}
```

---

# Roles and Permissions

| Endpoint       | Admin |  Teacher |
| -------------- | :---: | :------: |
| Register/Login |   ✓   |     ✓    |
| Students       |   ✓   | ✓ (View) |
| Teachers       |   ✓   | ✓ (View) |
| Classes        |   ✓   | ✓ (View) |
| Subjects       |   ✓   | ✓ (View) |
| Attendance     |   ✓   |     ✓    |
| Results        |   ✓   |     ✓    |

---

# Notes

* All UUID parameters must be valid UUIDs.
* Protected routes require a valid JWT.
* Input validation is handled using **express-validator**.
* Passwords are securely hashed using **bcryptjs**.
* Authentication is implemented using **JSON Web Tokens (JWT)**.
* Email notifications are sent using **Nodemailer** when configured.
