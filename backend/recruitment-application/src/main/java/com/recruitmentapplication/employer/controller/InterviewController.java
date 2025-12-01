package com.recruitmentapplication.employer.controller;

import com.recruitmentapplication.dto.InterviewDTO;
import com.recruitmentapplication.employer.services.InterviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidate/{candidateId}/interviews")
@CrossOrigin(
origins = "*",
allowedHeaders = "*",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class InterviewController {

@Autowired
private InterviewService service;

// READ: Get interviews with company name joined
@GetMapping
public List<InterviewDTO> getInterviews(@PathVariable Long candidateId) {
    return service.getInterviews(candidateId);
}


}
