package com.recruitmentapplication.candidate.model;
import jakarta.persistence.*;                   // JPA imports
import jakarta.validation.constraints.NotNull; // Validation import
import lombok.*;                               // Lombok imports
 
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "candidates")

public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @NotNull
    private String fullName;
 
    @NotNull
    private String phone;
 
    @NotNull
    private String email;
 
    @NotNull
    private String password;
 
    private String location;
    private String aboutMe;
    private String skills;          // stored as comma-separated string
    private String jobPreference;   // stored as comma-separated string
    private byte[] resume;
    private String education;
    private String experience;
    
}
