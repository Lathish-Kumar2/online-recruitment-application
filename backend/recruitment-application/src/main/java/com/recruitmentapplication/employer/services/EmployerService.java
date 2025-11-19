package com.recruitmentapplication.employer.services;

import com.recruitmentapplication.dto.EmployerSignupRequest;
import com.recruitmentapplication.employer.model.Employer;
import com.recruitmentapplication.employer.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployerService {

    @Autowired
    private EmployerRepository repository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Employer signup(EmployerSignupRequest dto) {
        Employer employer = new Employer();

        employer.setEmail(dto.getEmail());
        // employer.setPassword(encoder.encode(dto.getPassword()));
        employer.setPassword(dto.getPassword());
        employer.setCompanyName(dto.getCompanyName());
        employer.setEstd(dto.getEstd());
        employer.setEmployees(dto.getEmployees());
        employer.setTurnover(dto.getTurnover());
        employer.setFullName(dto.getFullName());
        employer.setPhone(dto.getPhone());
        employer.setRole("employer");


        return repository.save(employer);
    }

    // public Employer login(String email, String rawPassword) {
    // return repository.findByEmail(email)
    // .filter(emp -> encoder.matches(rawPassword, emp.getPassword()))
    // .orElse(null);
    // }

    public Employer login(String email, String password) {
        Employer emp = repository.findByEmail(email);

        if (emp == null) {
            return null; // email not registered
        }

        if (!emp.getPassword().equals(password)) {
            return null; // wrong password
        }

        return emp; // login success
    }

    public Employer updateEmployer(Long id, Employer updated) {
    Employer existing = repository.findById(id).orElse(null);
    if (existing == null) return null;

    existing.setCompanyName(updated.getCompanyName());
    existing.setEstd(updated.getEstd());
    existing.setEmployees(updated.getEmployees());
    existing.setTurnover(updated.getTurnover());
    existing.setEmail(updated.getEmail());

    return repository.save(existing);
}

}
