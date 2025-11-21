package com.recruitmentapplication.employer.controller;

import com.recruitmentapplication.dto.JobCreateRequest;
import com.recruitmentapplication.employer.model.Job;
import com.recruitmentapplication.employer.services.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/create")
    public Job createJob(@RequestBody JobCreateRequest request) {
        return jobService.createJob(request);
    }

    @GetMapping("/employer/{employerId}/all")
    public List<Job> getJobsByEmployer(@PathVariable Long employerId) {
        return jobService.getJobsByEmployer(employerId);
    }

    @PutMapping("/employer/{employerId}/update/{jobId}")
    public Job updateJob(
            @PathVariable Long employerId,
            @PathVariable Long jobId,
            @RequestBody JobCreateRequest request
    ) {
        return jobService.updateJob(employerId, jobId, request);
    }

    @DeleteMapping("/employer/{employerId}/delete/{jobId}")
    public String deleteJob(
            @PathVariable Long employerId,
            @PathVariable Long jobId
    ) {
        jobService.deleteJob(employerId, jobId);
        return "Job deleted successfully";
    }
}

