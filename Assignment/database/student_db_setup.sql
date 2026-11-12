-- ===================================================
-- Database Setup Script for Student Management System
-- Database: MySQL 8.0+
-- ===================================================

-- 1. Create database if not exists
CREATE DATABASE IF NOT EXISTS student_db;

-- 2. Use the database
USE student_db;

-- 3. Students Table DDL (matches JPA Entity)
CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    course VARCHAR(255) NOT NULL,
    age INT NOT NULL
);

-- 4. Sample Seed Data
INSERT INTO students (name, email, course, age) VALUES
('John Doe', 'john.doe@example.com', 'Computer Science', 21),
('Jane Smith', 'jane.smith@example.com', 'Data Science', 22),
('Alex Johnson', 'alex.j@example.com', 'Computer Science', 20),
('Emily Brown', 'emily.b@example.com', 'Information Technology', 23),
('Michael Lee', 'michael.lee@example.com', 'Data Science', 21)
ON DUPLICATE KEY UPDATE name=VALUES(name);

