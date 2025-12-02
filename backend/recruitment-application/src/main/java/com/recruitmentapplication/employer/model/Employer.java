package com.recruitmentapplication.employer.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name = "employers")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employer {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false, unique = true)
    private String email;
 
    @Column(nullable = false)
    private String password;
 
    @Column(nullable = false)
    private String companyName;  
 
    private Integer estd;        
    private Integer employees;  
    private String turnover;    
    private String fullName;    
    private String phone;
    private String role = "employer";
 
   
    public Employer(String email, String password, String companyName, Integer estd, Integer employees, String turnover, String fullName, String phone) {
        this.email = email;
        this.password = password;
        this.companyName = companyName;
        this.estd = estd;
        this.employees = employees;
        this.turnover = turnover;
        this.fullName = fullName;
        this.phone = phone;
    }

    public Employer(Long id) {
        this.id = id;
    }

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
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
 
    public String getCompanyName() {
        return companyName;
    }
 
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
 
    public Integer getEstd() {
        return estd;
    }
 
    public void setEstd(Integer estd) {
        this.estd = estd;
    }
 
    public Integer getEmployees() {
        return employees;
    }
 
    public void setEmployees(Integer employees) {
        this.employees = employees;
    }
 
    public String getTurnover() {
        return turnover;
    }
 
    public void setTurnover(String turnover) {
        this.turnover = turnover;
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
 
    public String getRole() {
        return role;
    }
 
    public void setRole(String role) {
        this.role = role;
    }
 
 
 
   
}
 