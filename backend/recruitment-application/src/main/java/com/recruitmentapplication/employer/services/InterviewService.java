package com.recruitmentapplication.employer.services;

import com.recruitmentapplication.dto.InterviewDTO;
import com.recruitmentapplication.employer.model.Interview;
import com.recruitmentapplication.employer.repository.ApplicationRepository;
import com.recruitmentapplication.employer.repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository repo;
    @Autowired
private ApplicationRepository applicationRepo;


    // Return interviews as DTOs for a candidate
    public List<InterviewDTO> getInterviews(Long candidateId) {
        return repo.findInterviewsWithCompany(candidateId);
    }

    public Interview scheduleInterview(Long employerId, Interview interview) {

    interview.setEmployerId(employerId);

    // FETCH application record
    var application = applicationRepo
            .findFirstByCandidateIdAndJobId(
                    interview.getCandidateId(),
                    interview.getJobId()
            )
            .orElseThrow(() -> new RuntimeException("Application not found"));

    // SET application_id in interview table
    interview.setApplicationId(application.getId());

    return repo.save(interview);
}


    // public List<Interview> getInterviews(Long employerId) {
    //     return repo.findByEmployerId(employerId);
    // }

    @Transactional
    public void deleteInterview(Long employerId, Long interviewId) {
        repo.deleteByIdAndEmployerId(interviewId, employerId);
    }

    public Optional<Interview> findInterviewByCandidateAndJob(Long candidateId, Long jobId) {
        return repo.findFirstByCandidateIdAndJobId(candidateId, jobId);
    }
    public Interview updateInterview(Long employerId, Long interviewId, Interview updated) {
 
        Interview interview = repo.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));
 
        if (!interview.getEmployerId().equals(employerId)) {
            throw new RuntimeException("Unauthorized: This interview does not belong to this employer");
        }
 
        interview.setCandidateName(updated.getCandidateName());
        interview.setCandidateEmail(updated.getCandidateEmail());
        interview.setJobTitle(updated.getJobTitle());
        interview.setDate(updated.getDate());
        interview.setTime(updated.getTime());
        interview.setMode(updated.getMode());
        interview.setComments(updated.getComments());
        interview.setStatus(updated.getStatus());
        interview.setRemarks(updated.getRemarks());
 
        return repo.save(interview);
    }
 
    public Interview updateInterviewStatus(Long employerId, Long interviewId, Interview updated) {
 
        Interview interview = repo.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));
 
        if (!interview.getEmployerId().equals(employerId)) {
            throw new RuntimeException("Unauthorized access to interview");
        }
 
        interview.setStatus(updated.getStatus());
        interview.setRemarks(updated.getRemarks());
 
        return repo.save(interview);
    }
}
