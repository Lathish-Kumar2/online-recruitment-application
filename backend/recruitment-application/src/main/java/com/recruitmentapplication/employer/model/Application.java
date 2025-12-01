package com.recruitmentapplication.employer.model;
 
import jakarta.persistence.*;
import lombok.*;
 
import java.time.LocalDateTime;
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
 
    private Long candidateId;
 
    private Long jobId;      // optional (null if employer sends interest without job context)
 
    private Long employerId;
 
    private LocalDateTime appliedAt = LocalDateTime.now();
 
    private Date appliedDate = new Date(System.currentTimeMillis());
}