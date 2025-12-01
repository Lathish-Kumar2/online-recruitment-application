package com.recruitmentapplication.employer.controller;
import com.recruitmentapplication.dto.ApplicationResponse;
import com.recruitmentapplication.employer.model.Application;
import com.recruitmentapplication.employer.model.Employer;
import com.recruitmentapplication.employer.model.Interview;
import com.recruitmentapplication.employer.services.ApplicationService;
import com.recruitmentapplication.employer.services.InterviewService;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
 
@RestController
@RequestMapping("/api/employer/{employerId}/applications")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowedHeaders = "*")

public class ApplicationController {
    @Autowired
    private ApplicationService service;
 
    @Autowired
    private InterviewService interviewService;
 
    // employer creates an application/interest (candidateId required)
    @PostMapping
    public Application createApplication(@PathVariable Long employerId, @RequestBody Application payload) {
        // enforce employerId in payload
        payload.setEmployer(new Employer(employerId));
        return service.createApplication(payload);
    }

    @PostMapping("/apply/{jobId}/candidate/{candidateId}")
public ResponseEntity<?> applyToJob(
        @PathVariable Long employerId,
        @PathVariable Long jobId,
        @PathVariable Long candidateId) {

    try {
        Application application = service.applyForJob(jobId, candidateId);
        return ResponseEntity.ok(application);
    } catch (Exception e) {
        return ResponseEntity.status(400).body("Failed to apply. You may have already applied.");
    }
}

 
    @GetMapping
    public List<ApplicationResponse> getApplications(@PathVariable Long employerId) {
        return service.getApplicationsForEmployer(employerId);
    }
 
    // @GetMapping("/{id}")
    // public ApplicationResponse getOne(@PathVariable Long employerId, @PathVariable Long id) {
    //     return service.getApplicationsForEmployer(employerId)
    //                   .stream()
    //                   .filter(a -> a.getId().equals(id))
    //                   .findFirst()
    //                   .orElseThrow(() -> new RuntimeException("Application not found"));
    // }
 
    @PostMapping("/{id}/accept")
    public Interview acceptApplication(@PathVariable Long employerId, @PathVariable Long id) {
        var apps = service.getApplicationsForEmployer(employerId);
        var appMaybe = apps.stream().filter(a -> a.getId().equals(id)).findFirst().orElseThrow(() -> new RuntimeException("Application Not Found"));
 
        Interview interview  = new  Interview();
 
        interview.setEmployerId(employerId);
        interview.setCandidateId(appMaybe.getCandidateId());
        interview.setCandidateName(appMaybe.getCandidateName());
        interview.setCandidateEmail(appMaybe.getCandidateEmail());
        interview.setJobId(appMaybe.getJobId());
        interview.setJobTitle(appMaybe.getJobTitle());
        interview.setStatus("Interested");
 
        Interview created = interviewService.scheduleInterview(employerId, interview);
 
        // service.deleteApplication(id);
       
        return created;
    }
 
    @PostMapping("/{id}/reject")
    public Interview rejectApplication(@PathVariable Long employerId, @PathVariable Long id) {
        var apps = service.getApplicationsForEmployer(employerId);
        var appMaybe = apps.stream().filter(a -> a.getId().equals(id)).findFirst().orElseThrow(() -> new RuntimeException("Application Not Found"));
 
        Interview interview  = new  Interview();
 
        interview.setEmployerId(employerId);
        interview.setCandidateId(appMaybe.getCandidateId());
        interview.setCandidateName(appMaybe.getCandidateName());
        interview.setCandidateEmail(appMaybe.getCandidateEmail());
        interview.setJobId(appMaybe.getJobId());
        interview.setJobTitle(appMaybe.getJobTitle());
        interview.setStatus("Rejected");
 
        Interview created = interviewService.scheduleInterview(employerId, interview);
 
        // service.deleteApplication(id);
       
        return created;
    }
    
}
