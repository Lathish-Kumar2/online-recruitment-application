package com.recruitmentapplication.dto;

import lombok.*;
 
import java.time.LocalDateTime;
import java.sql.Date;
 
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ApplicationResponse {
    private Long id;
    private Long candidateId;
    private String candidateName;
    private String candidateEmail;
    private Long jobId;
    private String jobTitle; // optional
    private Long employerId;
    private LocalDateTime appliedAt;
    private Date appliedDate = new Date(System.currentTimeMillis());
    private String interviewStatus;
    
}
