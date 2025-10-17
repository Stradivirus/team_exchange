package com.mbccurrency.controller;

import com.mbccurrency.dto.ExchangeRateDto;
import com.mbccurrency.dto.SeriesPoint;
import com.mbccurrency.service.ExchangeService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/feature")
public class FeatureController {
	private final ExchangeService service;

    public FeatureController(ExchangeService service) {
        this.service = service;
    }

    // 최신 1건
    @GetMapping("/latest")
    public ResponseEntity<ExchangeRateDto> latest() {
        return ResponseEntity.ok(service.getLatest());
    }

    // 범위 데이터 (모든 통화)
    @GetMapping
    public ResponseEntity<List<ExchangeRateDto>> range(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(service.getRange(start, end));
    }

    // 단일 통화 시계열 (프론트 차트용)
    @GetMapping("/series")
    public ResponseEntity<List<SeriesPoint>> series(
            @RequestParam String currency, 
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(service.getSeries(currency, start, end));
    }
}
