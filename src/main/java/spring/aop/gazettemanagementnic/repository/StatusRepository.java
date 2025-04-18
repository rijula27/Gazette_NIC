package spring.aop.gazettemanagementnic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import spring.aop.gazettemanagementnic.entity.Status;


public interface StatusRepository extends JpaRepository<Status, Long>{


    Optional<Status> findByStatusCode(Long code);
    Optional<Status> findByState(String state);

}
