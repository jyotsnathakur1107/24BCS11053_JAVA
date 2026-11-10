package com.jobportal.dto;

import com.jobportal.model.Job;
import java.time.LocalDateTime;

public class JobResponseDto {
    private Long id;
    private String title;
    private String company;
    private String location;
    private String jobType;
    private String experienceLevel;
    private String salary;
    private String description;
    private String requirements;
    private String contactEmail;
    private String status;
    private LocalDateTime postedAt;
    private LocalDateTime updatedAt;
    private long applicationCount;

    public JobResponseDto() {}

    public JobResponseDto(Job job, long applicationCount) {
        this.id = job.getId();
        this.title = job.getTitle();
        this.company = job.getCompany();
        this.location = job.getLocation();
        this.jobType = job.getJobType();
        this.experienceLevel = job.getExperienceLevel();
        this.salary = job.getSalary();
        this.description = job.getDescription();
        this.requirements = job.getRequirements();
        this.contactEmail = job.getContactEmail();
        this.status = job.getStatus();
        this.postedAt = job.getPostedAt();
        this.updatedAt = job.getUpdatedAt();
        this.applicationCount = applicationCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getRequirements() { return requirements; }
    public void setRequirements(String requirements) { this.requirements = requirements; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getPostedAt() { return postedAt; }
    public void setPostedAt(LocalDateTime postedAt) { this.postedAt = postedAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public long getApplicationCount() { return applicationCount; }
    public void setApplicationCount(long applicationCount) { this.applicationCount = applicationCount; }
}

