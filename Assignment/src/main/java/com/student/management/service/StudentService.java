package com.student.management.service;

import com.student.management.entity.Student;

import java.util.List;

public interface StudentService {

    // Add a new student
    Student saveStudent(Student student);

    // Retrieve all students
    List<Student> getAllStudents();

    // Retrieve student by ID
    Student getStudentById(Long id);

    // Update student details
    Student updateStudent(Long id, Student student);

    // Delete a student
    void deleteStudent(Long id);

    // Retrieve students by course
    List<Student> getStudentsByCourse(String course);
}

