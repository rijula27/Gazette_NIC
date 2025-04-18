package spring.aop.gazettemanagementnic.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import spring.aop.gazettemanagementnic.entity.Tender;

@Repository
public interface TenderRepository extends JpaRepository<Tender, Long> {


    List<Tender> findAllByGcUser_UsernameAndStatus_State(String username, String state);

    Optional<Tender> findById(Long id);


    List<Tender> findAllByStatus_State(String state);


    List<Tender> findAllByGcUser_Username(String username);

        boolean existsByTitleOrRefNo(String title, String ref_No);

    





}
