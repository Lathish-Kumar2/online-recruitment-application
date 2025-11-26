package com.recruitmentapplication.dto;


import lombok.Data;

@Data
public class ApplicationDto {
    private Long id;
    private Long candidateId;

    private String candidateName;
    private String jobTitle;
    private String appliedDate;
}
 