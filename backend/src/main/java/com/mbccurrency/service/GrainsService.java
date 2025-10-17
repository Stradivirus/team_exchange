package com.mbccurrency.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mbccurrency.dto.GrainsDto;
import com.mbccurrency.repository.jpa.PgGrainsRepository;

@Service
public class GrainsService {

    private final PgGrainsRepository repo;

    public GrainsService(PgGrainsRepository repo) {
        this.repo = repo;
    }

    /** 전체 곡물 데이터 조회 */
    @Transactional(readOnly = true)
    public List<GrainsDto> getAllGrains() {
        return repo.findAll().stream()
                .map(GrainsDto::fromEntity)
                .toList();
    }

    /** 날짜 범위로 데이터 조회 */
    @Transactional(readOnly = true)
    public List<GrainsDto> getGrainsByDateRange(LocalDate start, LocalDate end) {
        return repo.findByDateBetween(start, end).stream()
                .map(GrainsDto::fromEntity)
                .toList();
    }

    /** 특정 날짜 데이터 조회 (PK가 date라면 findById 사용이 더 안전) */
    @Transactional(readOnly = true)
    public Optional<GrainsDto> getGrainsByDate(LocalDate date) {
        return repo.findById(date)
                .map(GrainsDto::fromEntity);
        // 별도로 findByDate가 있다면 아래처럼 사용 가능:
        // return repo.findByDate(date).map(GrainsDto::fromEntity);
    }

    /** 가장 최근 데이터 1건 조회 */
    @Transactional(readOnly = true)
    public Optional<GrainsDto> getLatestGrains() {
        return repo.findTopByOrderByDateDesc()
                .map(GrainsDto::fromEntity);
    }

    /** 최근 데이터 n건 조회 (date DESC) */
    @Transactional(readOnly = true)
    public List<GrainsDto> getLatestN(int n) {
        var pageable = PageRequest.of(0, n, Sort.by(Sort.Direction.DESC, "date"));
        // 레포 메서드가 findAllByOrderByDateDesc(pageable)이라면 그걸로 교체하세요.
        return repo.findByOrderByDateDesc(pageable).stream()
                .map(GrainsDto::fromEntity)
                .toList();
    }
    
    public List<GrainsDto> getLatestAllNonNull(int n) {
        return repo.findLatestAllNonNull(n).stream().map(GrainsDto::fromEntity).toList();
    }
    
    public List<GrainsDto> getLatest(int n) {
        return repo.findLatest(n).stream().map(GrainsDto::fromEntity).toList();
    }

}
