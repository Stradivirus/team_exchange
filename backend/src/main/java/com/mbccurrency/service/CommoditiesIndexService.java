// service/CommoditiesIndexService.java
package com.mbccurrency.service;

import com.mbccurrency.entity.CommoditiesIndex;
import com.mbccurrency.repository.jpa.CommoditiesIndexRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CommoditiesIndexService {
    private final CommoditiesIndexRepository repo;

    public CommoditiesIndexService(CommoditiesIndexRepository repo) {
        this.repo = repo;
    }
    
    public List<CommoditiesIndex> findAll() { return repo.findAll(); }
    public Optional<CommoditiesIndex> findByDate(LocalDate date) { return repo.findById(date); }
}
