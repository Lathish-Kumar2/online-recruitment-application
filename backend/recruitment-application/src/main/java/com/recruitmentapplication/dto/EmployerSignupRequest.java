package com.recruitmentapplication.dto;

import lombok.Data;

@Data
public class EmployerSignupRequest {
    private String email;
    private String password;
    private String companyName;
    private Integer estd;
    private Integer employees;
    private String turnover;
    private String fullName;
    private String phone;
}
