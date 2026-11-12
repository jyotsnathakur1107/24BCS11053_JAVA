package com.student.management.service;

import com.student.management.entity.Student;
import com.student.management.exception.EmailAlreadyExistsException;
import com.student.management.exception.ResourceNotFoundException;
import com.student.management.repository.StudentRepository;
import com.student.management.service.impl.StudentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentServiceImpl studentService;

    private Student student;

    @BeforeEach
    void setUp() {
        student = new Student(1L, "Alice Brown", "alice.brown@example.com", "Computer Science", 20);
    }

    @Test
    @DisplayName("saveStudent - Success")
    void testSaveStudent_Success() {
        when(studentRepository.existsByEmail(student.getEmail())).thenReturn(false);
        when(studentRepository.save(student)).thenReturn(student);

        Student savedStudent = studentService.saveStudent(student);

        assertThat(savedStudent).isNotNull();
        assertThat(savedStudent.getEmail()).isEqualTo("alice.brown@example.com");
        verify(studentRepository, times(1)).save(student);
    }

    @Test
    @DisplayName("saveStudent - Duplicate Email Throws Exception")
    void testSaveStudent_DuplicateEmailThrowsException() {
        when(studentRepository.existsByEmail(student.getEmail())).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> studentService.saveStudent(student));
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    @DisplayName("getAllStudents - Success")
    void testGetAllStudents() {
        Student student2 = new Student(2L, "Bob White", "bob.white@example.com", "Mathematics", 22);
        when(studentRepository.findAll()).thenReturn(Arrays.asList(student, student2));

        List<Student> students = studentService.getAllStudents();

        assertThat(students).hasSize(2);
        verify(studentRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("getStudentById - Found")
    void testGetStudentById_Found() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        Student found = studentService.getStudentById(1L);

        assertThat(found).isNotNull();
        assertThat(found.getName()).isEqualTo("Alice Brown");
    }

    @Test
    @DisplayName("getStudentById - Not Found Throws Exception")
    void testGetStudentById_NotFound() {
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> studentService.getStudentById(999L));
    }

    @Test
    @DisplayName("updateStudent - Success")
    void testUpdateStudent_Success() {
        Student updateInfo = new Student(1L, "Alice Updated", "alice.updated@example.com", "Data Science", 21);
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        when(studentRepository.findByEmail("alice.updated@example.com")).thenReturn(Optional.empty());
        when(studentRepository.save(any(Student.class))).thenReturn(updateInfo);

        Student updated = studentService.updateStudent(1L, updateInfo);

        assertThat(updated.getName()).isEqualTo("Alice Updated");
        assertThat(updated.getCourse()).isEqualTo("Data Science");
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    @DisplayName("deleteStudent - Success")
    void testDeleteStudent_Success() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        doNothing().when(studentRepository).delete(student);

        studentService.deleteStudent(1L);

        verify(studentRepository, times(1)).delete(student);
    }

    @Test
    @DisplayName("deleteStudent - Not Found Throws Exception")
    void testDeleteStudent_NotFound() {
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> studentService.deleteStudent(999L));
        verify(studentRepository, never()).delete(any(Student.class));
    }

    @Test
    @DisplayName("getStudentsByCourse - Success")
    void testGetStudentsByCourse() {
        when(studentRepository.findByCourseIgnoreCase("Computer Science")).thenReturn(List.of(student));

        List<Student> results = studentService.getStudentsByCourse("Computer Science");

        assertThat(results).hasSize(1);
        assertThat(results.get(0).getCourse()).isEqualTo("Computer Science");
    }
}

