package com.mbccurrency.service;

import com.mbccurrency.entity.NewsSentiment;
import com.mbccurrency.repository.mongo.NewsSentimentRepository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class NewsSentimentService {

    private final NewsSentimentRepository repository;

    public NewsSentimentService(NewsSentimentRepository repository) {
        this.repository = repository;
    }

    // 전체 조회
    public List<NewsSentiment> getAll() {
        return repository.findAll();
    }

    // 특정 날짜
    public Optional<NewsSentiment> getByDate(Date date) {
        return repository.findByDate(date);
    }

    // 범위 조회
    public List<NewsSentiment> getByDateRange(Date start, Date end) {
        return repository.findByDateBetween(start, end);
    }

    // 최신 1건
    public Optional<NewsSentiment> getLatestOne() {
        return repository.findTopByOrderByDateDesc();
    }

    // 최신 n건 (전체)
    public List<NewsSentiment> getLatestN(int n) {
        return repository.findAllByOrderByDateDesc(PageRequest.of(0, n));
    }

    // ✅ 최신 n건 (비어있지 않은 문서만)
    public List<NewsSentiment> getLatestNonNull(int n) {
        var pageable = PageRequest.of(0, n, Sort.by(Sort.Direction.DESC, "date"));
        List<NewsSentiment> result = repository.findLatestNonNull(pageable);
        System.out.println("🔥 Mongo Result: " + result);
        return result;
    }
}
