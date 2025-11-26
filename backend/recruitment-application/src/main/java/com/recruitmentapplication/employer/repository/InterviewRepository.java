package com.recruitmentapplication.employer.repository;

import com.recruitmentapplication.employer.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByEmployerId(Long employerId);

    void deleteByIdAndEmployerId(Long id, Long employerId); 

    List<Interview> findByCandidateEmailAndJobTitle(String candidateEmail, String jobTitle);

    Optional<Interview> findFirstByCandidateIdAndJobId(Long candidateId, Long jobId);


}
