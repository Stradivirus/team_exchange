// service/InterestRateService.java
package com.mbccurrency.service;

import com.mbccurrency.entity.InterestRate;
import com.mbccurrency.repository.jpa.InterestRateRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class InterestRateService {
    private final InterestRateRepository repo;

    public InterestRateService(InterestRateRepository repo) {
		super();
		this.repo = repo;
	}
	public List<InterestRate> findAll() { return repo.findAll(); }
    public Optional<InterestRate> findByDate(LocalDate date) { return repo.findById(date); }
}
