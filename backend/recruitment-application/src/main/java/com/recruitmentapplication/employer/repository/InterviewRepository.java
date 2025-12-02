package com.recruitmentapplication.employer.repository;

import com.recruitmentapplication.dto.InterviewDTO;
import com.recruitmentapplication.employer.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

   @Query("""
    SELECT new com.recruitmentapplication.dto.InterviewDTO(
        i.jobTitle,
        e.companyName,
        i.date,
        a.appliedDate,
        i.status,
        i.comments,
        i.remarks
    )
    FROM Interview i
    JOIN Employer e ON i.employerId = e.id
    LEFT JOIN Application a ON i.applicationId = a.id
    WHERE i.candidateId = :candidateId
""")
List<InterviewDTO> findInterviewsWithCompany(@Param("candidateId") Long candidateId);



    void deleteByIdAndEmployerId(Long id, Long employerId);

    List<Interview> findByCandidateEmailAndJobTitle(String candidateEmail, String jobTitle);

    Optional<Interview> findFirstByCandidateIdAndJobId(Long candidateId, Long jobId);
}
