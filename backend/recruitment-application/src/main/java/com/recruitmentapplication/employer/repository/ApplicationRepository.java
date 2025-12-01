 
package com.recruitmentapplication.employer.repository;
 
import com.recruitmentapplication.employer.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByEmployerId(Long employerId);
}
 
 
