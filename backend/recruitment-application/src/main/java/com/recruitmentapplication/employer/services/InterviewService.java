package com.recruitmentapplication.employer.services;

import com.recruitmentapplication.dto.InterviewDTO;
import com.recruitmentapplication.employer.model.Interview;
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

    // Return interviews as DTOs for a candidate
    public List<InterviewDTO> getInterviews(Long candidateId) {
        return repo.findInterviewsWithCompany(candidateId);
    }

    @Transactional
    public void deleteInterview(Long employerId, Long interviewId) {
        repo.deleteByIdAndEmployerId(interviewId, employerId);
    }

    public Optional<Interview> findInterviewByCandidateAndJob(Long candidateId, Long jobId) {
        return repo.findFirstByCandidateIdAndJobId(candidateId, jobId);
    }
}
