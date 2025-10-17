package com.mbccurrency.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mbccurrency.dto.ExchangeRateDto;
import com.mbccurrency.dto.SeriesPoint;
import com.mbccurrency.entity.ExchangeRate;
import com.mbccurrency.service.ExchangeService;

@RestController
@RequestMapping("/api/exchange")
public class ExchangeController {

    private final ExchangeService service;

    public ExchangeController(ExchangeService service) {
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
            @RequestParam String currency,  // usd/jpy/eur/cny
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(service.getSeries(currency, start, end));
    }
    
    
    @GetMapping("/latest/{n}")
    public List<ExchangeRateDto> getLatest(@PathVariable int n) {
        List<ExchangeRate> list = service.getLatest(n);
        return list.stream()
                   .map(e -> new ExchangeRateDto(
                       e.getDate(), e.getUsd(), e.getJpy(), e.getEur(), e.getCny()
                   ))
                   .collect(Collectors.toList());
    }

    @GetMapping("/range")
    public List<ExchangeRateDto> getRange(@RequestParam("years") int years) {
        List<ExchangeRate> list = service.getRange(years);
        return list.stream()
                   .map(e -> new ExchangeRateDto(
                       e.getDate(), e.getUsd(), e.getJpy(), e.getEur(), e.getCny()
                   ))
                   .collect(Collectors.toList());
    }

}
