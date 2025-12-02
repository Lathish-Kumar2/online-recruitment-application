// package com.recruitmentapplication.employer.services;

// import com.recruitmentapplication.dto.JobCreateRequest;
// import com.recruitmentapplication.employer.model.Job;
// import com.recruitmentapplication.employer.repository.JobRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class JobService {

//     @Autowired
//     private JobRepository repo;

//     public Job createJob(JobCreateRequest request) {
//         Job job = new Job();

//         job.setJobTitle(request.getJobTitle());
//         job.setDesignation(request.getDesignation());
//         job.setSalary(request.getSalary());
//         job.setQualification(request.getQualification());
//         job.setJobType(request.getJobType());
//         job.setLocation(request.getLocation());
//         job.setDescription(request.getDescription());
//         job.setPostedDate(request.getPostedDate());
//         job.setCreatedAt(request.getCreatedAt());

//         // 🔥 later change this to get employer id from JWT
//         job.setEmployerId(request.getEmployerId() != null ? request.getEmployerId() : 1L);

//         return repo.save(job);
//     }

//     public List<Job> getJobs() {
//         return repo.findAll();
//     }

// }

package com.recruitmentapplication.employer.services;

import com.recruitmentapplication.dto.JobCreateRequest;
import com.recruitmentapplication.employer.model.Job;
import com.recruitmentapplication.employer.model.Employer;
import com.recruitmentapplication.employer.repository.JobRepository;
import com.recruitmentapplication.employer.repository.EmployerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private EmployerRepository employerRepo;

    public Job createJob(JobCreateRequest request) {

        Job job = new Job();

        job.setJobTitle(request.getJobTitle());
        job.setDesignation(request.getDesignation());
        job.setSalary(request.getSalary());
        job.setQualification(request.getQualification());
        job.setJobType(request.getJobType());
        job.setLocation(request.getLocation());
        job.setDescription(request.getDescription());

        Employer employer = employerRepo.findById(request.getEmployerId())
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        job.setEmployer(employer);

        return jobRepo.save(job);
    }

    public List<Job> getJobsByEmployer(Long employerId) {
        Employer employer = employerRepo.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        return jobRepo.findByEmployer(employer);
    }

    public Job getJobById(Long jobId) {
        return jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public Job updateJob(Long employerId, Long jobId, JobCreateRequest request) {

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

       if (!job.getEmployer().getId().equals(employerId)) {
    throw new RuntimeException("Unauthorized: This job does not belong to you");
}


        job.setJobTitle(request.getJobTitle());
        job.setSalary(request.getSalary());
        job.setDesignation(request.getDesignation());
        job.setQualification(request.getQualification());
        job.setDescription(request.getDescription());
        job.setJobType(request.getJobType());
        job.setLocation(request.getLocation());

        return jobRepo.save(job);
    }

    public void deleteJob(Long employerId, Long jobId) {

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployer().getId().equals(employerId)) {
            throw new RuntimeException("Unauthorized: Cannot delete this job");
        }

        jobRepo.delete(job);
    }

    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    public List<String> getAllLocations() {
        return jobRepo.findDistinctLocations();
    }

    public List<String> getAllJobTypes() {
        return jobRepo.findDistinctJobTypes();
    }

    public List<String> getAllSalaries() {
        return jobRepo.findDistinctSalaries();
    }
}
