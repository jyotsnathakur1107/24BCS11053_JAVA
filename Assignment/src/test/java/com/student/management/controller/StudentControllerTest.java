package com.student.management.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.student.management.entity.Student;
import com.student.management.exception.ResourceNotFoundException;
import com.student.management.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StudentController.class)
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentService studentService;

    @Autowired
    private ObjectMapper objectMapper;

    private Student student1;
    private Student student2;

    @BeforeEach
    void setUp() {
        student1 = new Student(1L, "John Doe", "john.doe@example.com", "Computer Science", 21);
        student2 = new Student(2L, "Jane Smith", "jane.smith@example.com", "Data Science", 22);
    }

    @Test
    @DisplayName("POST /api/students - Should create and return 201 Created")
    void testCreateStudent() throws Exception {
        Mockito.when(studentService.saveStudent(any(Student.class))).thenReturn(student1);

        mockMvc.perform(post("/api/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(student1)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("John Doe")))
                .andExpect(jsonPath("$.email", is("john.doe@example.com")))
                .andExpect(jsonPath("$.course", is("Computer Science")))
                .andExpect(jsonPath("$.age", is(21)));
    }

    @Test
    @DisplayName("POST /api/students - Invalid payload should return 400 Bad Request")
    void testCreateStudent_ValidationError() throws Exception {
        Student invalidStudent = new Student(null, "", "not-an-email", "", -5);

        mockMvc.perform(post("/api/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidStudent)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.course").exists())
                .andExpect(jsonPath("$.errors.age").exists());
    }

    @Test
    @DisplayName("GET /api/students - Should return all students with 200 OK")
    void testGetAllStudents() throws Exception {
        List<Student> students = Arrays.asList(student1, student2);
        Mockito.when(studentService.getAllStudents()).thenReturn(students);

        mockMvc.perform(get("/api/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("John Doe")))
                .andExpect(jsonPath("$[1].name", is("Jane Smith")));
    }

    @Test
    @DisplayName("GET /api/students/{id} - Existing ID should return student with 200 OK")
    void testGetStudentById_Success() throws Exception {
        Mockito.when(studentService.getStudentById(1L)).thenReturn(student1);

        mockMvc.perform(get("/api/students/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("John Doe")))
                .andExpect(jsonPath("$.email", is("john.doe@example.com")));
    }

    @Test
    @DisplayName("GET /api/students/{id} - Non-existent ID should return 404 Not Found")
    void testGetStudentById_NotFound() throws Exception {
        Mockito.when(studentService.getStudentById(999L))
                .thenThrow(new ResourceNotFoundException("Student", "id", 999L));

        mockMvc.perform(get("/api/students/{id}", 999L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.error", is("Not Found")))
                .andExpect(jsonPath("$.message", is("Student not found with id : '999'")));
    }

    @Test
    @DisplayName("PUT /api/students/{id} - Should update student and return 200 OK")
    void testUpdateStudent_Success() throws Exception {
        Student updatedStudent = new Student(1L, "John Doe Updated", "john.updated@example.com", "Artificial Intelligence", 22);
        Mockito.when(studentService.updateStudent(eq(1L), any(Student.class))).thenReturn(updatedStudent);

        mockMvc.perform(put("/api/students/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedStudent)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("John Doe Updated")))
                .andExpect(jsonPath("$.email", is("john.updated@example.com")))
                .andExpect(jsonPath("$.course", is("Artificial Intelligence")))
                .andExpect(jsonPath("$.age", is(22)));
    }

    @Test
    @DisplayName("DELETE /api/students/{id} - Should delete student and return 200 OK")
    void testDeleteStudent_Success() throws Exception {
        Mockito.doNothing().when(studentService).deleteStudent(1L);

        mockMvc.perform(delete("/api/students/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Student with ID 1 has been successfully deleted.")));
    }

    @Test
    @DisplayName("GET /api/students/course/{course} - Should return students by course with 200 OK")
    void testGetStudentsByCourse() throws Exception {
        List<Student> csStudents = List.of(student1);
        Mockito.when(studentService.getStudentsByCourse("Computer Science")).thenReturn(csStudents);

        mockMvc.perform(get("/api/students/course/{course}", "Computer Science"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].course", is("Computer Science")))
                .andExpect(jsonPath("$[0].name", is("John Doe")));
    }
}
