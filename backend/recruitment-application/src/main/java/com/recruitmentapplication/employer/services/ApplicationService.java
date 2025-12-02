package com.recruitmentapplication.employer.services;
import com.recruitmentapplication.dto.ApplicationResponse;
import com.recruitmentapplication.employer.model.Application;
import com.recruitmentapplication.employer.model.Employer;
import com.recruitmentapplication.employer.model.Interview;
import com.recruitmentapplication.candidate.model.Candidate;
import com.recruitmentapplication.employer.model.Job;
import com.recruitmentapplication.employer.repository.ApplicationRepository;
import com.recruitmentapplication.employer.repository.InterviewRepository;
import com.recruitmentapplication.candidate.repository.CandidateRepository;
import com.recruitmentapplication.employer.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
 
@Service

public class ApplicationService {
    @Autowired
    private ApplicationRepository appRepo;
 
    @Autowired
    private CandidateRepository candidateRepo;
 
    @Autowired
    private InterviewRepository interviewRepo;
 
    @Autowired
    private JobRepository jobRepo;
 
    public Application createApplication(Application application) {
        return appRepo.save(application);
    }
 
    public List<ApplicationResponse> getApplicationsForEmployer(Long employerId) {
 
        List<Application> apps = appRepo.findByEmployer_Id(employerId);
 
        return apps.stream().map(a -> {
 
            ApplicationResponse r = new ApplicationResponse();
            r.setId(a.getId());
            r.setCandidateId(a.getCandidate().getId());
            r.setJobId(a.getJob().getId());
            r.setEmployerId(a.getEmployer().getId());
 
            candidateRepo.findById(a.getCandidate().getId()).ifPresent(c -> {
                r.setCandidateName(c.getFullName());
                r.setCandidateEmail(c.getEmail());
            });
 
            // if (cand != null) {
            //     r.setCandidateName(cand.getFullName());
            //     r.setCandidateEmail(cand.getEmail());
            // }
 
            // --- Job Title Lookup ---
            String jobTitle = null;
 
            if ((a.getJob().getId()) != null) {
                Job job = jobRepo.findById((a.getJob().getId())).orElse(null);
                if (job != null) {
                    jobTitle = job.getJobTitle();
                    r.setJobTitle(job.getJobTitle());
                }
            }
 
           
            // String status = "Interested";
 
            Interview interview = null;
            // if (cand != null && jobTitle != null) {
            //     List<Interview> interviews = interviewRepo
            //             .findByCandidateEmailAndJobTitle(cand.getEmail(), jobTitle);
 
            //     if (!interviews.isEmpty()) {
            //         status = interviews.get(0).getStatus(); // first matching interview
            //     }
            // }
 
            if((a.getJob().getId()) != null){
                interview = interviewRepo.findFirstByCandidateIdAndJobId((a.getCandidate().getId()), (a.getJob().getId())).orElse(null);
            }else{
                interview = interviewRepo.findFirstByCandidateIdAndJobId((a.getCandidate().getId()), null).orElse(null);
            }
 
            r.setInterviewStatus(interview != null ? interview.getStatus() : "Pending");
            // r.setStatus(status);
 
 
 
            return r;
 
        }).collect(Collectors.toList());
    }
 
    @Transactional
    public void deleteApplication(Long id){
        appRepo.deleteById(id);
    }

     public Application applyForJob(Long jobId, Long candidateId) {

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Candidate candidate = candidateRepo.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Employer employer = job.getEmployer(); // link employer from job

        // Check if already applied
        boolean exists = appRepo.existsByJob_IdAndCandidate_Id(jobId, candidateId);
        if (exists) {
            throw new RuntimeException("Already applied");
        }

        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setEmployer(employer);
        application.setAppliedDate(new java.sql.Date(System.currentTimeMillis()));
        application.setAppliedAt(new java.sql.Timestamp(System.currentTimeMillis()));

        return appRepo.save(application);
    }
    
}
