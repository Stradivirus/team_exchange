package com.mbccurrency.repository.jpa;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mbccurrency.entity.Grains;

public interface PgGrainsRepository extends JpaRepository<Grains, LocalDate> {

    List<Grains> findByDateBetween(LocalDate start, LocalDate end);

    Optional<Grains> findByDate(LocalDate date);

    Optional<Grains> findTopByOrderByDateDesc();
    
    List<Grains> findByOrderByDateDesc(Pageable pageable);
    
    @Query(value = """
    	    SELECT *
    	    FROM grains
    	    WHERE corn IS NOT NULL
    	      AND corn_volume IS NOT NULL
    	      AND wheat IS NOT NULL
    	      AND wheat_volume IS NOT NULL
    	      AND rice IS NOT NULL
    	      AND rice_volume IS NOT NULL
    	      AND coffee IS NOT NULL
    	      AND coffee_volume IS NOT NULL
    	      AND sugar IS NOT NULL
    	      AND sugar_volume IS NOT NULL
    	    ORDER BY date DESC
    	    LIMIT :n
    	    """, nativeQuery = true)
    	List<Grains> findLatestAllNonNull(@Param("n") int n);
    
    @Query(value = "SELECT * FROM grains ORDER BY date DESC LIMIT :n", nativeQuery = true)
    List<Grains> findLatest(@Param("n") int n);
    
}
