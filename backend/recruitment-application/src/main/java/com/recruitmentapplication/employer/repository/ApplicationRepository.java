package com.recruitmentapplication.employer.repository;

import com.recruitmentapplication.employer.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByEmployer_Id(Long employerId);

    List<Application> findByCandidate_Id(Long candidateId);
    Optional<Application> findFirstByCandidateIdAndJobId(Long candidateId, Long jobId);


    List<Application> findByJob_Id(Long jobId);

    boolean existsByJob_IdAndCandidate_Id(Long jobId, Long candidateId);
}

