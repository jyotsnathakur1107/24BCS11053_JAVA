# 📸 Postman API Testing & Screenshots Guide

This guide details all 6 required endpoints plus error handling test cases with mockups matching the Postman UI, request headers, JSON payloads, HTTP status codes, and response bodies.

A ready-to-use Postman Collection is included at:
[`postman/Student_Management_API.postman_collection.json`](../postman/Student_Management_API.postman_collection.json)

An interactive HTML visual dashboard is also available at:
[`postman/postman_test_report.html`](../postman/postman_test_report.html)

---

## 🚀 How to Import into Postman
1. Launch **Postman**.
2. Click the **Import** button in the top left workspace pane.
3. Drag and drop `postman/Student_Management_API.postman_collection.json` or browse to select it.
4. The collection **"Student Management REST API"** will appear in your left sidebar with all pre-configured requests.
5. Ensure the collection variable `baseUrl` is set to `http://localhost:8080`.

---

## 📌 Endpoint Test Cases & Visual Representation

```
========================================================================================
Test 1: POST /api/students — Add a new student
========================================================================================
[METHOD] POST
[URL]    http://localhost:8080/api/students
[HEADER] Content-Type: application/json

[REQUEST BODY]
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "course": "Computer Science",
  "age": 21
}

[RESPONSE]
Status: 201 Created   Time: 34 ms   Size: 130 B
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "course": "Computer Science",
  "age": 21
}
```

```
========================================================================================
Test 2: POST /api/students — Add second student (Data Science)
========================================================================================
[METHOD] POST
[URL]    http://localhost:8080/api/students
[HEADER] Content-Type: application/json

[REQUEST BODY]
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "course": "Data Science",
  "age": 22
}

[RESPONSE]
Status: 201 Created   Time: 21 ms   Size: 126 B
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "course": "Data Science",
  "age": 22
}
```

```
========================================================================================
Test 3: GET /api/students — Retrieve all students
========================================================================================
[METHOD] GET
[URL]    http://localhost:8080/api/students

[RESPONSE]
Status: 200 OK   Time: 16 ms   Size: 256 B
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science",
    "age": 21
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "course": "Data Science",
    "age": 22
  }
]
```

```
========================================================================================
Test 4: GET /api/students/{id} — Retrieve student by ID
========================================================================================
[METHOD] GET
[URL]    http://localhost:8080/api/students/1

[RESPONSE]
Status: 200 OK   Time: 12 ms   Size: 130 B
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "course": "Computer Science",
  "age": 21
}
```

```
========================================================================================
Test 5: PUT /api/students/{id} — Update student details
========================================================================================
[METHOD] PUT
[URL]    http://localhost:8080/api/students/1
[HEADER] Content-Type: application/json

[REQUEST BODY]
{
  "name": "Johnathan Doe",
  "email": "johnathan.doe@example.com",
  "course": "Computer Science",
  "age": 22
}

[RESPONSE]
Status: 200 OK   Time: 28 ms   Size: 140 B
{
  "id": 1,
  "name": "Johnathan Doe",
  "email": "johnathan.doe@example.com",
  "course": "Computer Science",
  "age": 22
}
```

```
========================================================================================
Test 6: GET /api/students/course/{course} — Retrieve students by course
========================================================================================
[METHOD] GET
[URL]    http://localhost:8080/api/students/course/Data%20Science

[RESPONSE]
Status: 200 OK   Time: 15 ms   Size: 128 B
[
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "course": "Data Science",
    "age": 22
  }
]
```

```
========================================================================================
Test 7: DELETE /api/students/{id} — Delete a student
========================================================================================
[METHOD] DELETE
[URL]    http://localhost:8080/api/students/1

[RESPONSE]
Status: 200 OK   Time: 19 ms   Size: 84 B
{
  "success": true,
  "message": "Student with ID 1 has been successfully deleted."
}
```

```
========================================================================================
Test 8: GET /api/students/999 — Exception Handling: Student Not Found
========================================================================================
[METHOD] GET
[URL]    http://localhost:8080/api/students/999

[RESPONSE]
Status: 404 Not Found   Time: 11 ms   Size: 135 B
{
  "timestamp": "2026-11-09 19:26:42",
  "status": 404,
  "error": "Not Found",
  "message": "Student not found with id : '999'",
  "path": "/api/students/999"
}
```

```
========================================================================================
Test 9: POST /api/students — Exception Handling: Validation Error
========================================================================================
[METHOD] POST
[URL]    http://localhost:8080/api/students
[HEADER] Content-Type: application/json

[REQUEST BODY]
{
  "name": "",
  "email": "invalid-email-format",
  "course": "",
  "age": -5
}

[RESPONSE]
Status: 400 Bad Request   Time: 14 ms   Size: 220 B
{
  "timestamp": "2026-11-09T19:26:42",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed for request arguments",
  "errors": {
    "name": "Student name cannot be empty",
    "email": "Please provide a valid email address",
    "course": "Course cannot be empty",
    "age": "Age must be greater than 0"
  },
  "path": "/api/students"
}
```

