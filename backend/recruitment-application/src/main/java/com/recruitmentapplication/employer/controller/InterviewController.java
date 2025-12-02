package com.recruitmentapplication.employer.controller;

import com.recruitmentapplication.employer.model.Interview;
import com.recruitmentapplication.dto.InterviewDTO;
import com.recruitmentapplication.employer.services.InterviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class InterviewController {

    @Autowired
    private InterviewService service;


    // --------------------------
    // CANDIDATE FETCH INTERVIEWS
    // --------------------------
    @GetMapping("/candidate/{candidateId}/interviews")
    public List<InterviewDTO> getInterviews(@PathVariable Long candidateId) {
        return service.getInterviews(candidateId);
    }


    // --------------------------
    // EMPLOYER SCHEDULE INTERVIEW
    // --------------------------
    @PostMapping("/employer/{employerId}/interviews")
    public Interview scheduleInterview(
            @PathVariable Long employerId,
            @RequestBody Interview interview
    ) {
        return service.scheduleInterview(employerId, interview);
    }


    // --------------------------
    // EMPLOYER DELETE INTERVIEW
    // --------------------------
    @DeleteMapping("/employer/{employerId}/interviews/{interviewId}")
    public void deleteInterview(
            @PathVariable Long employerId,
            @PathVariable Long interviewId
    ) {
        service.deleteInterview(employerId, interviewId);
    }


    // --------------------------
    // EMPLOYER UPDATE STATUS
    // --------------------------
    @PutMapping("/employer/{employerId}/interviews/update-status/{interviewId}")
    public Interview updateStatus(
            @PathVariable Long employerId,
            @PathVariable Long interviewId,
            @RequestBody Interview updated
    ) {
        return service.updateInterviewStatus(employerId, interviewId, updated);
    }
}
