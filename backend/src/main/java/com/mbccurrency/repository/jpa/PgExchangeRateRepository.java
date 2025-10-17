package com.mbccurrency.repository.jpa;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mbccurrency.entity.ExchangeRate;

public interface PgExchangeRateRepository extends JpaRepository<ExchangeRate, LocalDate> {

	// 기간 조회(오름차순)
    List<ExchangeRate> findByDateBetweenOrderByDateAsc(LocalDate start, LocalDate end);

    // 최신 1건
    Optional<ExchangeRate> findTopByOrderByDateDesc();
    
    // ✅ 지정된 기간(date between start ~ end) 데이터 조회
    @Query(value = """
        SELECT *
        FROM exchange
        WHERE date BETWEEN :start AND :end
        ORDER BY date ASC
    """, nativeQuery = true)
    List<ExchangeRate> findByDateBetween(
        @Param("start") LocalDate start,
        @Param("end") LocalDate end
    );
    
    @Query(value = """
        SELECT *
        FROM exchange
        ORDER BY date DESC
        LIMIT :n
    """, nativeQuery = true)
    List<ExchangeRate> findLatest(@Param("n") int n);
}
