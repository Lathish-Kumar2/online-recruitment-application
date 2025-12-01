package com.recruitmentapplication.employer.repository;

import com.recruitmentapplication.employer.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByEmployer_Id(Long employerId);

    List<Application> findByCandidate_Id(Long candidateId);

    List<Application> findByJob_Id(Long jobId);

    boolean existsByJob_IdAndCandidate_Id(Long jobId, Long candidateId);
}

