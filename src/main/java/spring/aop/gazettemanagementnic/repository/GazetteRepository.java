package spring.aop.gazettemanagementnic.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spring.aop.gazettemanagementnic.entity.Gazette;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface GazetteRepository extends JpaRepository<Gazette, Long> {

    Gazette findByFileName(String fileName);



    Gazette findByFileNameAndDate(String fileName, LocalDate date);

    Gazette findByDateAndPart(LocalDate currentDate, String part);


    List<Gazette> findAllByGcUser_Username(String username);



    List<Gazette> findAllByGcUser_UsernameAndStatus_State(String username, String state);

    List<Gazette> findAllByStatus_State(String state);
    



    Optional<Gazette> findById(Long id);


}

