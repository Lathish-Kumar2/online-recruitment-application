package com.recruitmentapplication.dto;

import lombok.Data;

@Data
class EmployerSignUpDTO {
    private String email;
    private String password;
    private String companyName;
    private Integer estd;
    private Integer employees;
    private Double turnover;
    private String fullName;
    private String phone;
}