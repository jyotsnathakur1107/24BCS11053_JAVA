package com.student.management.repository;

import com.student.management.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Retrieve students by course (case-insensitive for convenience)
    List<Student> findByCourseIgnoreCase(String course);

    // Retrieve students by course (exact match)
    List<Student> findByCourse(String course);

    // Find student by email
    Optional<Student> findByEmail(String email);

    // Check if email already exists
    boolean existsByEmail(String email);
}

