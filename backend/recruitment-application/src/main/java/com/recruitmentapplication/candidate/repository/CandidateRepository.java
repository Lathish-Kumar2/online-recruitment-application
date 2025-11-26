package com.recruitmentapplication.candidate.repository;


import com.recruitmentapplication.candidate.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    // keep simple; service will do filtering in-memory for dev
}
 
