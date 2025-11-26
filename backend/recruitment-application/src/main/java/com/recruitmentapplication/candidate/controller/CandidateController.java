package com.recruitmentapplication.candidate.controller;

import com.recruitmentapplication.candidate.model.Candidate;
import com.recruitmentapplication.candidate.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class CandidateController {

    @Autowired
    private CandidateService service;

    // GET /api/candidates?qualification=&location=&jobType=&skills=&minExperience=&maxSalary=
    @GetMapping("/candidates")
    public List<Candidate> searchCandidates(
            @RequestParam(required = false) String qualification,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) Double minExperience,
            @RequestParam(required = false) Double maxSalary
    ) {
        return service.searchCandidates(
                Optional.ofNullable(qualification),
                Optional.ofNullable(location),
                Optional.ofNullable(jobType),
                Optional.ofNullable(skills),
                Optional.ofNullable(minExperience),
                Optional.ofNullable(maxSalary)
        );
    }

    @GetMapping("/candidates/{id}")
    public Candidate getCandidate(@PathVariable Long id) {
        return service.getById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }
    
}
