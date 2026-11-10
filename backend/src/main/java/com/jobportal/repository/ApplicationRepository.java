package com.jobportal.repository;

import com.jobportal.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findAllByOrderByAppliedAtDesc();

    List<Application> findByJobIdOrderByAppliedAtDesc(Long jobId);

    long countByJobId(Long jobId);

    long countByStatus(String status);
}

