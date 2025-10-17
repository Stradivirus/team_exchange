// service/CommoditiesService.java
package com.mbccurrency.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mbccurrency.dto.CommoditiesDto;
import com.mbccurrency.entity.Commodities;
import com.mbccurrency.repository.jpa.CommoditiesRepository;

@Service
public class CommoditiesService {
    private final CommoditiesRepository repo;

    public CommoditiesService(CommoditiesRepository repo) {
		this.repo = repo;
	}
	public List<Commodities> findAll() { return repo.findAll(); }
    public Optional<Commodities> findByDate(LocalDate date) { return repo.findById(date); }

    public List<CommoditiesDto> getLatestAllNonNull(int n) {
        return repo.findLatestAllNonNull(n).stream().map(CommoditiesDto::fromEntity).toList();
    }
    
    public List<CommoditiesDto> getLatest(int n) {
        return repo.findLatest(n).stream().map(CommoditiesDto::fromEntity).toList();
    }
}
