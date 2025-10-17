// service/PcaService.java
package com.mbccurrency.service;

import com.mbccurrency.entity.Pca;
import com.mbccurrency.repository.jpa.PcaRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PcaService {
    private final PcaRepository repo;

    public PcaService(PcaRepository repo) {
		super();
		this.repo = repo;
	}
    
	public List<Pca> findAll() { return repo.findAll(); }
    public Optional<Pca> findByDate(LocalDate date) { return repo.findById(date); }
}
