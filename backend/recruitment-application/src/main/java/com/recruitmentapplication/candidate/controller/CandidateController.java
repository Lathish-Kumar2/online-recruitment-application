package com.recruitmentapplication.candidate.controller;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
 
import com.recruitmentapplication.candidate.model.Candidate;
import com.recruitmentapplication.candidate.services.CandidateService;
import com.recruitmentapplication.candidate.repository.CandidateRepository;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
 
import java.io.IOException;
import java.util.Map;
 
@RestController
@RequestMapping("/api/candidates")

public class CandidateController {
    @Autowired
    private CandidateService candidateService;
 
    @Autowired
    private CandidateRepository candidateRepository;
 
    @PostMapping("/signup")
    public String registerCandidate(@RequestBody Candidate candidate) {
 
        if (candidateService.emailExists(candidate.getEmail())) {
            return "Email already registered!";
        }
 
        candidateService.registerCandidate(candidate);
        return "Candidate registered successfully!";
    }
 
    @PostMapping("/login")
    public ResponseEntity<?> loginCandidate(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
 
        Candidate candidate = candidateService.authenticate(email, password);
 
        if (candidate == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
 
        return ResponseEntity.ok(candidate);
    }
 
    @GetMapping("/{id}")
    public Candidate getProfile(@PathVariable Long id) {
        return candidateService.getCandidate(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
    }
 
    @GetMapping("/{id}/resume")
    public ResponseEntity<byte[]> downloadResume(@PathVariable Long id) {
 
        Candidate c = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
 
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "resume.pdf");
 
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(c.getResume());
    }
 
    @PutMapping("/update/{id}")
    public Candidate updateProfile(@PathVariable Long id, @RequestBody Candidate candidate) {
        return candidateService.updateCandidate(id, candidate);
    }
 
    @PutMapping("/resume/{id}")
    public ResponseEntity<?> uploadResume(
            @PathVariable Long id,
            @RequestParam("resume") MultipartFile resumeFile) {
 
        Candidate c = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
 
        try {
            c.setResume(resumeFile.getBytes());
            candidateRepository.save(c);
            return ResponseEntity.ok("Resume uploaded");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload resume");
        }
    }
    
}
