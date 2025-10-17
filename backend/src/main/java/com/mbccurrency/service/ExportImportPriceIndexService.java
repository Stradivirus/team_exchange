package com.mbccurrency.service;

import com.mbccurrency.entity.ExportImportPriceIndex;
import com.mbccurrency.repository.mongo.ExportImportPriceIndexRepository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ExportImportPriceIndexService {

    private final ExportImportPriceIndexRepository repository;

    public ExportImportPriceIndexService(ExportImportPriceIndexRepository repository) {
        this.repository = repository;
    }

    public List<ExportImportPriceIndex> getAll() {
        return repository.findAll();
    }

    public Optional<ExportImportPriceIndex> getByDate(Date date) {
        return repository.findByDate(date);
    }

    public List<ExportImportPriceIndex> getByDateRange(Date start, Date end) {
        return repository.findByDateBetween(start, end);
    }

    public Optional<ExportImportPriceIndex> getLatestOne() {
        return repository.findTopByOrderByDateDesc();
    }

    public List<ExportImportPriceIndex> getLatestN(int n) {
        return repository.findAllByOrderByDateDesc(PageRequest.of(0, n));
    }

    // ✅ 비어있지 않은 최신 n건
    public List<ExportImportPriceIndex> getLatestNonNull(int n) {
        var pageable = PageRequest.of(0, n, Sort.by(Sort.Direction.DESC, "date"));
        List<ExportImportPriceIndex> result = repository.findLatestNonNull(pageable);
        System.out.println("🔥 Mongo Result: " + result);
        return result;
    }
}
