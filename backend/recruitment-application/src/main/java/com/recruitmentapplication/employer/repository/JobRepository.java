package com.recruitmentapplication.employer.repository;

import com.recruitmentapplication.employer.model.Employer;
import com.recruitmentapplication.employer.model.Job;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployer(Employer employer);

    @Query("SELECT DISTINCT j.location FROM Job j")
    List<String> findDistinctLocations();

    @Query("SELECT DISTINCT j.salary FROM Job j")
    List<String> findDistinctSalaries();

    @Query("SELECT DISTINCT j.jobType FROM Job j")
    List<String> findDistinctJobTypes();

}