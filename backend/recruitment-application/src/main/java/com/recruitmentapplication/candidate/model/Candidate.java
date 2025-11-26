package com.recruitmentapplication.candidate.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "candidates")
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(name = "full_name")
    private String fullName;

    private String phone;

    private String education;

    // years of experience (nullable)
    private Double experience;

    private byte[] resume;

    @Column(length = 1000)
    private String skills; // comma-separated (e.g. "Java,React,SQL")

    @Column(length = 2000)
    private String aboutMe;

    @Column(name = "job_preference", length = 500)
    private String jobPreference;

    private String location;

    // optional expected salary (in LPA) - can be null if not provide   

    // Getters and Setters
    public Long getId() {
        return id;
    }   
    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getEducation() {
        return education;
    }
    public void setEducation(String education) {
        this.education = education;
    }
    public Double getExperience() {
        return experience;
    }
    public void setExperience(Double experience) {
        this.experience = experience;
    }
    public String getSkills() {
        return skills;
    }
    public void setSkills(String skills) {
        this.skills = skills;
    }
    public String getAboutMe() {
        return aboutMe;
    }
    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }
    public String getJobPreference() {
        return jobPreference;
    }
    public void setJobPreference(String jobPreferences) {
        this.jobPreference = jobPreferences;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public byte[] getResume(){
        return resume;
    }
    public void setResume(byte[] resume){
        this.resume = resume;
    }
    
  

    

}
 
