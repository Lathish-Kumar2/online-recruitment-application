package com.recruitmentapplication.dto;

import java.sql.Date;

public class InterviewDTO {

    private String jobTitle;
    private String companyName;
    private Date date;
    private Date appliedDate;
    private String status;
    private String comments;
    private String remarks;

    public InterviewDTO(String jobTitle, String companyName, Date date, Date appliedDate,
                        String status, String comments, String remarks) {
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.date = date;
        this.appliedDate = appliedDate;
        this.status = status;
        this.comments = comments;
        this.remarks = remarks;
    }

    public String getJobTitle() { return jobTitle; }
    public String getCompanyName() { return companyName; }
    public Date getDate() { return date; }
    public Date getAppliedDate() { return appliedDate; }
    public String getStatus() { return status; }
    public String getComments() { return comments; }
    public String getRemarks() { return remarks; }
}
