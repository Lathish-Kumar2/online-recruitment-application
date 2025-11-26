package com.recruitmentapplication.employer.model;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employerId;

    private Long candidateId;

    private String candidateName;
    private String candidateEmail;

    private String jobTitle;
    private Long jobId;

    private Date date = new Date(System.currentTimeMillis());

    private String time;

    private String mode;

    @Column(length = 500)
    private String comments;

    private String status;
    @Column(length = 1000)
    private String remarks;

}
