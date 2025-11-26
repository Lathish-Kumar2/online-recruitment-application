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
import com.recruitmentapplication.employer.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository repo;

    public Job createJob(JobCreateRequest request) {

        Job job = new Job();

        job.setJobTitle(request.getJobTitle());
        job.setDesignation(request.getDesignation());
        job.setSalary(request.getSalary());
        job.setQualification(request.getQualification());
        job.setJobType(request.getJobType());
        job.setLocation(request.getLocation());
        job.setDescription(request.getDescription());

        job.setEmployerId(request.getEmployerId());

        return repo.save(job);
    }

    public List<Job> getJobs() {
        return repo.findAll();
    }

    public List<Job> getJobsByEmployer(Long employerId) {
        return repo.findByEmployerId(employerId);
    }

    public Job updateJob(Long employerId, Long jobId, JobCreateRequest request) {
        Job job = repo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployerId().equals(employerId)) {
            throw new RuntimeException("Unauthorized: This job does not belong to you");
        }

        job.setJobTitle(request.getJobTitle());
        job.setSalary(request.getSalary());
        job.setDesignation(request.getDesignation());
        job.setQualification(request.getQualification());
        job.setDescription(request.getDescription());
        job.setJobType(request.getJobType());
        job.setLocation(request.getLocation());

        return repo.save(job);
    }

    public void deleteJob(Long employerId, Long jobId) {
        Job job = repo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployerId().equals(employerId)) {
            throw new RuntimeException("Unauthorized: Cannot delete this job");
        }

        repo.delete(job);
    }

}
