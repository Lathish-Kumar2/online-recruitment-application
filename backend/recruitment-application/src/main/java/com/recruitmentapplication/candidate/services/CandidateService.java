package com.recruitmentapplication.candidate.services;
import com.recruitmentapplication.candidate.model.Candidate;
import com.recruitmentapplication.candidate.repository.CandidateRepository;
 
import java.util.Optional;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
@Service

public class CandidateService {
    @Autowired
    private CandidateRepository candidateRepository;
 
    public boolean emailExists(String email) {
        return candidateRepository.findByEmail(email).isPresent();
    }
 
    public Candidate registerCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }
 
    // login lookup
    public Candidate getCandidateByEmail(String email) {
        return candidateRepository.findByEmail(email)
                .orElse(null);  // return null if not found
    }
 
    public Candidate authenticate(String email, String password) {
 
        //  Fix: get Optional correctly
        Candidate candidate = candidateRepository.findByEmail(email)
                .orElse(null);
 
        if (candidate != null && candidate.getPassword().equals(password)) {
            return candidate;
        }
 
        return null;
    }
 
    public Optional<Candidate> getCandidate(Long id) {
        return candidateRepository.findById(id);
    }
 
    public Candidate updateCandidate(Long id, Candidate updated) {
        Candidate existing = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
 
        existing.setFullName(updated.getFullName());
        existing.setPhone(updated.getPhone());
        existing.setEducation(updated.getEducation());
        existing.setExperience(updated.getExperience());
        existing.setSkills(updated.getSkills());
        existing.setLocation(updated.getLocation());
        existing.setAboutMe(updated.getAboutMe());
        existing.setJobPreference(updated.getJobPreference());
 
        return candidateRepository.save(existing);
    }
    
}
