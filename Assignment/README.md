# 🎓 Student Management REST API

A production-ready RESTful API for managing student records, developed using **Spring Boot**, **Spring Data JPA**, and **MySQL**.

---

## 📌 Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Entity Model](#-entity-model)
- [API Endpoints](#-api-endpoints)
- [Database Configuration](#-database-configuration)
- [Getting Started](#-getting-started)
- [Exception Handling & Status Codes](#-exception-handling--status-codes)
- [Postman Testing & Collection](#-postman-testing--collection)
- [Running Automated Tests](#-running-automated-tests)
- [GitHub Setup & Push Guide](#-github-setup--push-guide)

---

## 🚀 Project Overview
This project provides a comprehensive RESTful Web Service to perform CRUD (Create, Read, Update, Delete) operations on student records and query students by course. It features:
- Standard REST conventions and HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`).
- Global centralized exception handling via `@ControllerAdvice`.
- Hibernate Validator annotations (`@NotBlank`, `@Email`, `@Min`, `@NotNull`).
- Spring Data JPA with MySQL database integration.
- Unit and integration tests with MockMvc and JUnit 5.

---

## 🛠 Tech Stack
- **Language:** Java 17
- **Framework:** Spring Boot 3.3.4
- **Persistence:** Spring Data JPA / Hibernate
- **Database:** MySQL 8.0+
- **Validation:** Jakarta Bean Validation (Hibernate Validator)
- **Build Tool:** Apache Maven
- **Testing:** JUnit 5, Mockito, MockMvc, H2 Database (in-memory for unit testing)
- **API Client:** Postman

---

## 📋 Entity Model

### `Student` Entity (`students` table)

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| `id` | `Long` | Primary Key, Auto-Increment | Unique Student ID |
| `name` | `String` | `@NotBlank`, Not Null | Student's full name |
| `email` | `String` | `@NotBlank`, `@Email`, Unique | Student's email address |
| `course` | `String` | `@NotBlank`, Not Null | Enrolled course name |
| `age` | `Integer` | `@NotNull`, `@Min(1)` | Student's age |

---

## 🌐 API Endpoints

| HTTP Method | Endpoint | Description | Success Code | Error Codes |
|-------------|----------|-------------|--------------|-------------|
| **POST** | `/api/students` | Add a new student | `201 CREATED` | `400 BAD REQUEST`, `409 CONFLICT` |
| **GET** | `/api/students` | Retrieve all students | `200 OK` | `500 INTERNAL SERVER ERROR` |
| **GET** | `/api/students/{id}` | Retrieve student by ID | `200 OK` | `404 NOT FOUND` |
| **PUT** | `/api/students/{id}` | Update student details | `200 OK` | `400 BAD REQUEST`, `404 NOT FOUND`, `409 CONFLICT` |
| **DELETE** | `/api/students/{id}` | Delete a student | `200 OK` | `404 NOT FOUND` |
| **GET** | `/api/students/course/{course}` | Retrieve students by course | `200 OK` | `500 INTERNAL SERVER ERROR` |

---

## 🗄 Database Configuration

### 1. `application.properties` (src/main/resources/application.properties)
```properties
# Server Configuration
server.port=8080

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/student_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

> **Note:** If your MySQL password is not `root`, simply update `spring.datasource.password` with your password.

### 2. Manual SQL Setup (Optional)
A pre-written SQL initialization script is available at `database/student_db_setup.sql`:
```sql
CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    course VARCHAR(255) NOT NULL,
    age INT NOT NULL
);
```

---

## 🏃 Getting Started

### Prerequisites
- **JDK 17** or higher installed (`java -version`)
- **Maven 3.8+** installed (`mvn -version`)
- **MySQL 8.0+** running on `localhost:3306`

### Steps to Run
1. **Clone or open the repository:**
   ```bash
   cd assignment
   ```

2. **Configure MySQL:**
   Open `src/main/resources/application.properties` and verify your MySQL `username` and `password`.

3. **Build the project:**
   ```bash
   mvn clean package
   ```

4. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```
   Or execute the packaged JAR:
   ```bash
   java -jar target/student-management-api-1.0.0.jar
   ```

5. The server will start on: **`http://localhost:8080`**

---

## ⚠️ Exception Handling & Status Codes

All errors return structured JSON responses via `@ControllerAdvice`:

### 1. Resource Not Found (`404 NOT FOUND`)
When requesting an ID that does not exist:
```json
{
  "timestamp": "2026-11-09 19:15:00",
  "status": 404,
  "error": "Not Found",
  "message": "Student not found with id : '999'",
  "path": "/api/students/999"
}
```

### 2. Validation Error (`400 BAD REQUEST`)
When mandatory fields are blank or invalid:
```json
{
  "timestamp": "2026-11-09T19:15:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed for request arguments",
  "errors": {
    "name": "Student name cannot be empty",
    "email": "Please provide a valid email address",
    "age": "Age must be greater than 0",
    "course": "Course cannot be empty"
  },
  "path": "/api/students"
}
```

### 3. Duplicate Email Conflict (`409 CONFLICT`)
When attempting to insert or update with an existing email:
```json
{
  "timestamp": "2026-11-09 19:15:00",
  "status": 409,
  "error": "Conflict",
  "message": "Student with email 'john.doe@example.com' already exists.",
  "path": "/api/students"
}
```

---

## 📬 Postman Testing & Collection

### Importing the Collection
1. Open **Postman**.
2. Click **Import** (top left).
3. Select `postman/Student_Management_API.postman_collection.json`.
4. Ensure the collection variable `baseUrl` is set to `http://localhost:8080`.

### Endpoint Requests & Sample Payloads

#### 1. Add a New Student
- **Method:** `POST`
- **URL:** `http://localhost:8080/api/students`
- **Body (raw JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science",
    "age": 21
  }
  ```
- **Response Status:** `201 Created`
- **Response Body:**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science",
    "age": 21
  }
  ```

#### 2. Retrieve All Students
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/students`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "course": "Computer Science",
      "age": 21
    }
  ]
  ```

#### 3. Retrieve Student by ID
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/students/1`
- **Response Status:** `200 OK`

#### 4. Update Student Details
- **Method:** `PUT`
- **URL:** `http://localhost:8080/api/students/1`
- **Body (raw JSON):**
  ```json
  {
    "name": "Johnathan Doe",
    "email": "johnathan.doe@example.com",
    "course": "Computer Science",
    "age": 22
  }
  ```
- **Response Status:** `200 OK`

#### 5. Retrieve Students by Course
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/students/course/Computer%20Science`
- **Response Status:** `200 OK`

#### 6. Delete Student
- **Method:** `DELETE`
- **URL:** `http://localhost:8080/api/students/1`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "success": true,
    "message": "Student with ID 1 has been successfully deleted."
  }
  ```

---

## 🧪 Running Automated Tests
Run unit and integration tests using:
```bash
mvn test
```
Tests run against an isolated in-memory **H2 database** without requiring an external MySQL connection.

---

## 🐙 GitHub Setup & Push Guide

To push this codebase to your GitHub repository:

```bash
# 1. Initialize git if not already initialized
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "feat: complete Student Management REST API with Spring Boot, JPA and MySQL"

# 4. Rename main branch
git branch -M main

# 5. Add your remote GitHub repo URL
git remote add origin https://github.com/<your-username>/student-management-api.git

# 6. Push to GitHub
git push -u origin main
```

