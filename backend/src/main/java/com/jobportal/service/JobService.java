package com.jobportal.service;

import com.jobportal.dto.DashboardStatsDto;
import com.jobportal.dto.JobRequestDto;
import com.jobportal.dto.JobResponseDto;
import com.jobportal.model.Job;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class JobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public JobService(JobRepository jobRepository, ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public List<JobResponseDto> getAllJobs(String keyword, String location, String jobType, String status) {
        List<Job> jobs;
        boolean hasFilters = (keyword != null && !keyword.isBlank()) ||
                             (location != null && !location.isBlank()) ||
                             (jobType != null && !jobType.isBlank() && !jobType.equalsIgnoreCase("All")) ||
                             (status != null && !status.isBlank() && !status.equalsIgnoreCase("All"));

        if (hasFilters) {
            String kw = (keyword != null && !keyword.isBlank()) ? keyword.trim() : null;
            String loc = (location != null && !location.isBlank()) ? location.trim() : null;
            String jt = (jobType != null && !jobType.isBlank() && !jobType.equalsIgnoreCase("All")) ? jobType.trim() : null;
            String st = (status != null && !status.isBlank() && !status.equalsIgnoreCase("All")) ? status.trim() : null;
            jobs = jobRepository.searchJobs(kw, loc, jt, st);
        } else {
            jobs = jobRepository.findAllByOrderByPostedAtDesc();
        }

        return jobs.stream().map(job -> {
            long count = applicationRepository.countByJobId(job.getId());
            return new JobResponseDto(job, count);
        }).collect(Collectors.toList());
    }

    public JobResponseDto getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        long count = applicationRepository.countByJobId(job.getId());
        return new JobResponseDto(job, count);
    }

    public Job getJobEntityById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    public JobResponseDto createJob(JobRequestDto dto) {
        Job job = new Job();
        job.setTitle(dto.getTitle());
        job.setCompany(dto.getCompany());
        job.setLocation(dto.getLocation());
        job.setJobType(dto.getJobType());
        job.setExperienceLevel(dto.getExperienceLevel());
        job.setSalary(dto.getSalary());
        job.setDescription(dto.getDescription());
        job.setRequirements(dto.getRequirements());
        job.setContactEmail(dto.getContactEmail());
        job.setStatus(dto.getStatus() != null ? dto.getStatus() : "OPEN");

        Job saved = jobRepository.save(job);
        return new JobResponseDto(saved, 0);
    }

    public JobResponseDto updateJob(Long id, JobRequestDto dto) {
        Job job = getJobEntityById(id);
        job.setTitle(dto.getTitle());
        job.setCompany(dto.getCompany());
        job.setLocation(dto.getLocation());
        job.setJobType(dto.getJobType());
        job.setExperienceLevel(dto.getExperienceLevel());
        job.setSalary(dto.getSalary());
        job.setDescription(dto.getDescription());
        job.setRequirements(dto.getRequirements());
        job.setContactEmail(dto.getContactEmail());
        if (dto.getStatus() != null) {
            job.setStatus(dto.getStatus());
        }

        Job updated = jobRepository.save(job);
        long count = applicationRepository.countByJobId(id);
        return new JobResponseDto(updated, count);
    }

    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new RuntimeException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
    }

    public DashboardStatsDto getDashboardStats() {
        long totalJobs = jobRepository.count();
        long openJobs = jobRepository.countByStatus("OPEN");
        long closedJobs = jobRepository.countByStatus("CLOSED");
        long totalApps = applicationRepository.count();
        long pendingApps = applicationRepository.countByStatus("APPLIED");
        long shortlistedApps = applicationRepository.countByStatus("SHORTLISTED") + applicationRepository.countByStatus("UNDER_REVIEW");
        long acceptedApps = applicationRepository.countByStatus("ACCEPTED");
        long rejectedApps = applicationRepository.countByStatus("REJECTED");

        return new DashboardStatsDto(totalJobs, openJobs, closedJobs, totalApps, 
                                     pendingApps, shortlistedApps, acceptedApps, rejectedApps);
    }
}

