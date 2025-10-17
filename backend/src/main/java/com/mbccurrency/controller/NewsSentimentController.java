package com.mbccurrency.controller;

import com.mbccurrency.entity.NewsSentiment;
import com.mbccurrency.service.NewsSentimentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/mongo/news-sentiment") // ✅ 엔드포인트도 news-sentiment로
public class NewsSentimentController {

    private final NewsSentimentService service;
    

    public NewsSentimentController(NewsSentimentService service) {
		this.service = service;
	}

	// 전체
    @GetMapping("/all")
    public ResponseEntity<List<NewsSentiment>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // 특정 날짜
    @GetMapping("/date/{date}")
    public ResponseEntity<?> getByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return ResponseEntity.of(service.getByDate(date));
    }

    // 기간 조회
    @GetMapping("/range")
    public ResponseEntity<List<NewsSentiment>> getByRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
        return ResponseEntity.ok(service.getByDateRange(start, end));
    }

    // 최신 1건
    @GetMapping("/latest")
    public ResponseEntity<?> getLatestOne() {
        return ResponseEntity.of(service.getLatestOne());
    }

    // 최신 n건
    @GetMapping("/latest/{n}")
    public ResponseEntity<List<NewsSentiment>> getLatestN(@PathVariable("n") int n) {
        return ResponseEntity.ok(service.getLatestN(n));
    }

    // 최신 n건 (null 제외)
    @GetMapping("/latest/non-null/{n}")
    public ResponseEntity<List<NewsSentiment>> getLatestNonNull(@PathVariable("n") int n) {
        return ResponseEntity.ok(service.getLatestNonNull(n));
    }
}
