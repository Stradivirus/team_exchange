// repository/StockRepository.java
package com.mbccurrency.repository.jpa;

import com.mbccurrency.entity.Stock;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, LocalDate> {

    // 기본 조회들
    List<Stock> findByDateBetween(LocalDate start, LocalDate end);
    Optional<Stock> findByDate(LocalDate date);
    Optional<Stock> findTopByOrderByDateDesc();
    List<Stock> findByOrderByDateDesc(Pageable pageable); // or findByOrderByDateDesc(Pageable)

    // 모든 지수/거래량이 NULL이 아닌 최신 N건 (native)
    @Query(value = """
        SELECT *
        FROM stock
        WHERE sp500 IS NOT NULL
          AND sp500_volume IS NOT NULL
          AND dow_jones IS NOT NULL
          AND dow_jones_volume IS NOT NULL
          AND nasdaq IS NOT NULL
          AND nasdaq_volume IS NOT NULL
          AND kospi IS NOT NULL
          AND kospi_volume IS NOT NULL
          AND kosdaq IS NOT NULL
          AND kosdaq_volume IS NOT NULL
        ORDER BY date DESC
        LIMIT :n
        """, nativeQuery = true)
    List<Stock> findLatestAllNonNull(@Param("n") int n);

    // 단순 최신 N건 (native)
    @Query(value = """
        SELECT *
        FROM stock
        ORDER BY date DESC
        LIMIT :n
        """, nativeQuery = true)
    List<Stock> findLatest(@Param("n") int n);
}
