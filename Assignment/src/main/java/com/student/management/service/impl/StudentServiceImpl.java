package com.student.management.service.impl;

import com.student.management.entity.Student;
import com.student.management.exception.EmailAlreadyExistsException;
import com.student.management.exception.ResourceNotFoundException;
import com.student.management.repository.StudentRepository;
import com.student.management.service.StudentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student saveStudent(Student student) {
        // Check if student with given email already exists
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new EmailAlreadyExistsException("Student with email '" + student.getEmail() + "' already exists.");
        }
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    }

    @Override
    public Student updateStudent(Long id, Student studentDetails) {
        // Check if student exists
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        // If email is changed, verify new email is not taken by another student
        if (!existingStudent.getEmail().equalsIgnoreCase(studentDetails.getEmail())) {
            Optional<Student> studentWithSameEmail = studentRepository.findByEmail(studentDetails.getEmail());
            if (studentWithSameEmail.isPresent() && !studentWithSameEmail.get().getId().equals(id)) {
                throw new EmailAlreadyExistsException("Email '" + studentDetails.getEmail() + "' is already in use by another student.");
            }
        }

        // Update fields
        existingStudent.setName(studentDetails.getName());
        existingStudent.setEmail(studentDetails.getEmail());
        existingStudent.setCourse(studentDetails.getCourse());
        existingStudent.setAge(studentDetails.getAge());

        return studentRepository.save(existingStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        // Check if student exists
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        studentRepository.delete(existingStudent);
    }

    @Override
    public List<Student> getStudentsByCourse(String course) {
        return studentRepository.findByCourseIgnoreCase(course);
    }
}

