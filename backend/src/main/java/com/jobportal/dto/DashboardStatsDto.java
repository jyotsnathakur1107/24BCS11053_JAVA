package com.jobportal.dto;

public class DashboardStatsDto {
    private long totalJobs;
    private long openJobs;
    private long closedJobs;
    private long totalApplications;
    private long pendingApplications;
    private long shortlistedApplications;
    private long acceptedApplications;
    private long rejectedApplications;

    public DashboardStatsDto() {}

    public DashboardStatsDto(long totalJobs, long openJobs, long closedJobs, 
                             long totalApplications, long pendingApplications, 
                             long shortlistedApplications, long acceptedApplications, 
                             long rejectedApplications) {
        this.totalJobs = totalJobs;
        this.openJobs = openJobs;
        this.closedJobs = closedJobs;
        this.totalApplications = totalApplications;
        this.pendingApplications = pendingApplications;
        this.shortlistedApplications = shortlistedApplications;
        this.acceptedApplications = acceptedApplications;
        this.rejectedApplications = rejectedApplications;
    }

    public long getTotalJobs() { return totalJobs; }
    public void setTotalJobs(long totalJobs) { this.totalJobs = totalJobs; }

    public long getOpenJobs() { return openJobs; }
    public void setOpenJobs(long openJobs) { this.openJobs = openJobs; }

    public long getClosedJobs() { return closedJobs; }
    public void setClosedJobs(long closedJobs) { this.closedJobs = closedJobs; }

    public long getTotalApplications() { return totalApplications; }
    public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }

    public long getPendingApplications() { return pendingApplications; }
    public void setPendingApplications(long pendingApplications) { this.pendingApplications = pendingApplications; }

    public long getShortlistedApplications() { return shortlistedApplications; }
    public void setShortlistedApplications(long shortlistedApplications) { this.shortlistedApplications = shortlistedApplications; }

    public long getAcceptedApplications() { return acceptedApplications; }
    public void setAcceptedApplications(long acceptedApplications) { this.acceptedApplications = acceptedApplications; }

    public long getRejectedApplications() { return rejectedApplications; }
    public void setRejectedApplications(long rejectedApplications) { this.rejectedApplications = rejectedApplications; }
}

