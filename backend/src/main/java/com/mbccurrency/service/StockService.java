// service/StockService.java
package com.mbccurrency.service;

import com.mbccurrency.dto.StockDto;
import com.mbccurrency.entity.Stock;
import com.mbccurrency.repository.jpa.StockRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {
    private final StockRepository repo;

    public StockService(StockRepository repo) {
		super();
		this.repo = repo;
	}
	public List<Stock> findAll() { return repo.findAll(); }
    public Optional<Stock> findByDate(LocalDate date) { return repo.findById(date); }

    /** 날짜 범위로 데이터 조회 */
    @Transactional(readOnly = true)
    public List<StockDto> getStockByDateRange(LocalDate start, LocalDate end) {
        return repo.findByDateBetween(start, end).stream()
                .map(StockDto::fromEntity)
                .toList();
    }

    /** 특정 날짜 데이터 조회 (PK가 date라면 findById 사용이 더 안전) */
    @Transactional(readOnly = true)
    public Optional<StockDto> getStockByDate(LocalDate date) {
        return repo.findById(date)
                .map(StockDto::fromEntity);
        // 별도로 findByDate가 있다면 아래처럼 사용 가능:
        // return repo.findByDate(date).map(StockDto::fromEntity);
    }

    /** 가장 최근 데이터 1건 조회 */
    @Transactional(readOnly = true)
    public Optional<StockDto> getLatestStock() {
        return repo.findTopByOrderByDateDesc()
                .map(StockDto::fromEntity);
    }

    /** 최근 데이터 n건 조회 (date DESC) */
    @Transactional(readOnly = true)
    public List<StockDto> getLatestN(int n) {
        var pageable = PageRequest.of(0, n, Sort.by(Sort.Direction.DESC, "date"));
        // 레포 메서드가 findAllByOrderByDateDesc(pageable)이라면 그걸로 교체하세요.
        return repo.findByOrderByDateDesc(pageable).stream()
                .map(StockDto::fromEntity)
                .toList();
    }
    
    public List<StockDto> getLatestAllNonNull(int n) {
        return repo.findLatestAllNonNull(n).stream().map(StockDto::fromEntity).toList();
    }
    
    public List<StockDto> getLatest(int n) {
        return repo.findLatest(n).stream().map(StockDto::fromEntity).toList();
    }
}
