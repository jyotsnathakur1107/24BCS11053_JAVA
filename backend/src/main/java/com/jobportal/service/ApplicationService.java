package com.jobportal.service;

import com.jobportal.dto.ApplicationRequestDto;
import com.jobportal.model.Application;
import com.jobportal.model.Job;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAllByOrderByAppliedAtDesc();
    }

    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobIdOrderByAppliedAtDesc(jobId);
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }

    public Application createApplication(ApplicationRequestDto dto) {
        Job job = jobRepository.findById(dto.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + dto.getJobId()));

        Application application = new Application();
        application.setJob(job);
        application.setApplicantName(dto.getApplicantName());
        application.setApplicantEmail(dto.getApplicantEmail());
        application.setApplicantPhone(dto.getApplicantPhone());
        application.setExperienceYears(dto.getExperienceYears());
        application.setResumeUrl(dto.getResumeUrl());
        application.setCoverLetter(dto.getCoverLetter());
        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    public Application updateApplicationStatus(Long id, String status) {
        Application application = getApplicationById(id);
        application.setStatus(status.toUpperCase());
        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException("Application not found with id: " + id);
        }
        applicationRepository.deleteById(id);
    }
}

