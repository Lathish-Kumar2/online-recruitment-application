package com.recruitmentapplication.employer.controller;

import com.recruitmentapplication.dto.EmployerSignupRequest;
import com.recruitmentapplication.employer.model.Employer;
import com.recruitmentapplication.employer.services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/employer")
public class EmployerController {

    @Autowired
    private EmployerService service;

    @PutMapping("/update/{id}")
    public Employer updateEmployer(@PathVariable Long id, @RequestBody Employer employer) {
        return service.updateEmployer(id, employer);
    }

}
