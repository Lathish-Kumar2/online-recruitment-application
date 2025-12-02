package com.recruitmentapplication.employer.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "interviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long candidateId;
    private String candidateName;
    private String candidateEmail;

    private String jobTitle;

    @Column(name = "employer_id")
    private Long employerId;

    // JOIN: Employer
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", insertable = false, updatable = false)
    private Employer employer;

    private Date date;   // interview date
    private String time;
    private String mode;
    private String status;
    private String comments;
    private String remarks;

    private Long jobId;


    // ---------------------------------------
    // JOIN WITH APPLICATION (NEW PART BELOW)
    // ---------------------------------------
@Column(name = "application_id", nullable = false)
private Long applicationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", insertable = false, updatable = false)
    private Application application;
}
