// repository/CommoditiesRepository.java
package com.mbccurrency.repository.jpa;

import com.mbccurrency.entity.Commodities;
import com.mbccurrency.entity.Grains;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CommoditiesRepository extends JpaRepository<Commodities, LocalDate> {
	
	List<Commodities> findByDateBetween(LocalDate start, LocalDate end);

    Optional<Commodities> findByDate(LocalDate date);

    Optional<Commodities> findTopByOrderByDateDesc();
    
    List<Commodities> findByOrderByDateDesc(Pageable pageable);
	
	
    // 모든 주요 지표와 볼륨이 NULL이 아닌 행 중 최신 N건
    @Query(value = """
        SELECT *
        FROM commodities
        WHERE gold IS NOT NULL
          AND gold_volume IS NOT NULL
          AND silver IS NOT NULL
          AND silver_volume IS NOT NULL
          AND copper IS NOT NULL
          AND copper_volume IS NOT NULL
          AND crude_oil IS NOT NULL
          AND crude_oil_volume IS NOT NULL
          AND brent_oil IS NOT NULL
          AND brent_oil_volume IS NOT NULL
        ORDER BY date DESC
        LIMIT :n
        """, nativeQuery = true)
    List<Commodities> findLatestAllNonNull(@Param("n") int n);

    // 단순히 최신 N건만
    @Query(value = """
        SELECT *
        FROM commodities
        ORDER BY date DESC
        LIMIT :n
        """, nativeQuery = true)
    List<Commodities> findLatest(@Param("n") int n);
}
