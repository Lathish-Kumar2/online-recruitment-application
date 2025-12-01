package com.recruitmentapplication.employer.model;
 
import jakarta.persistence.*;
import lombok.*;

import com.recruitmentapplication.candidate.model.Candidate;

import java.time.LocalDateTime;
import java.sql.Timestamp;
import java.sql.Date;
 
@Entity
@Table(name = "applications_received")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    private Date appliedDate;

    private Timestamp appliedAt;

    // Getters & Setters

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    public Date getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(Date appliedDate) {
        this.appliedDate = appliedDate;
    }

    public Timestamp getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(Timestamp appliedAt) {
        this.appliedAt = appliedAt;
    }
    
}
