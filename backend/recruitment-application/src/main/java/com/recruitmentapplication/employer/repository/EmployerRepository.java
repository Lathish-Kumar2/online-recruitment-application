package com.recruitmentapplication.employer.repository;

import com.recruitmentapplication.employer.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployerRepository extends JpaRepository<Employer, Long> {
    Employer findByEmail(String email);
}

