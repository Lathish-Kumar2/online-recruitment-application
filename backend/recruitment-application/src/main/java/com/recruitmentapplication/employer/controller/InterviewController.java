package com.recruitmentapplication.employer.controller;

import com.recruitmentapplication.employer.model.Interview;
import com.recruitmentapplication.employer.services.InterviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employer/{employerId}/interviews")
@CrossOrigin(
    origins = "*",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    
public class InterviewController {

    @Autowired
    private InterviewService service;

    // CREATE
    @PostMapping
    public Interview scheduleInterview(
            @PathVariable Long employerId,
            @RequestBody Interview interview) {
        return service.scheduleInterview(employerId, interview);
    }

    // READ
    @GetMapping
    public List<Interview> getInterviews(@PathVariable Long employerId) {
        return service.getInterviews(employerId);
    }

    // DELETE
    @DeleteMapping("/{interviewId}")
    public void deleteInterview(
            @PathVariable Long employerId,
            @PathVariable Long interviewId) {
        service.deleteInterview(employerId, interviewId);

    }

    // UPDATE full interview
    @PutMapping("/update/{interviewId}")
    public ResponseEntity<Interview> updateInterview(
            @PathVariable Long employerId,
            @PathVariable Long interviewId,
            @RequestBody Interview updated) {

        Interview interview = service.updateInterview(employerId, interviewId, updated);
        return ResponseEntity.ok(interview);
    }

    // UPDATE status + remarks only
    @PutMapping("/update-status/{interviewId}")
    public Interview updateStatus(
            @PathVariable Long employerId,
            @PathVariable Long interviewId,
            @RequestBody Interview updated) {

        return service.updateInterviewStatus(employerId, interviewId, updated);
    }
}
