package com.recruitmentapplication.candidate.services;

import com.recruitmentapplication.candidate.model.Candidate;
import com.recruitmentapplication.candidate.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository repo;

    public List<Candidate> searchCandidates(Optional<String> qualification,
                                            Optional<String> location,
                                            Optional<String> jobType,
                                            Optional<String> skills,
                                            Optional<Double> minExperience,
                                            Optional<Double> maxSalary) {

        List<Candidate> all = repo.findAll();

        return all.stream()
                .filter(c -> qualification.map(q ->
                        (c.getEducation() != null && c.getEducation().toLowerCase().contains(q.toLowerCase()))
                ).orElse(true))
                .filter(c -> location.map(loc ->
                        (c.getLocation() != null && c.getLocation().toLowerCase().contains(loc.toLowerCase()))
                ).orElse(true))
                .filter(c -> jobType.map(jt ->
                        (c.getJobPreference() != null && c.getJobPreference().toLowerCase().contains(jt.toLowerCase()))
                ).orElse(true))
                .filter(c -> skills.map(s -> {
                    if (c.getSkills() == null) return false;
                    String[] want = s.toLowerCase().split(",");
                    String have = c.getSkills().toLowerCase();
                    return Arrays.stream(want).allMatch(w -> have.contains(w.trim()));
                }).orElse(true))
                .filter(c -> minExperience.map(min -> c.getExperience() != null && c.getExperience() >= min).orElse(true))
                .collect(Collectors.toList());
    }

    public Optional<Candidate> getById(Long id) {
        return repo.findById(id);
    }
}
