package com.mbccurrency.controller;

import com.mbccurrency.entity.ExportImportPriceIndex;
import com.mbccurrency.service.ExportImportPriceIndexService;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/mongo/export-import-price-index")
public class ExportImportPriceIndexController {

    private final ExportImportPriceIndexService service;

    public ExportImportPriceIndexController(ExportImportPriceIndexService service) {
        this.service = service;
    }

    // 전체 조회
    @GetMapping("/all")
    public ResponseEntity<List<ExportImportPriceIndex>> getAll() {
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
    public ResponseEntity<List<ExportImportPriceIndex>> getByRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
        return ResponseEntity.ok(service.getByDateRange(start, end));
    }

    // 최신 1건
    @GetMapping("/latest")
    public ResponseEntity<?> getLatestOne() {
        return ResponseEntity.of(service.getLatestOne());
    }

    // 최신 n건 (전체)
    @GetMapping("/latest/{n}")
    public ResponseEntity<List<ExportImportPriceIndex>> getLatestN(@PathVariable("n") int n) {
        return ResponseEntity.ok(service.getLatestN(n));
    }

    // ✅ 최신 n건 (비어있지 않은 문서만)
    @GetMapping("/latest/non-null/{n}")
    public ResponseEntity<List<ExportImportPriceIndex>> getLatestNonNull(@PathVariable("n") int n) {
        return ResponseEntity.ok(service.getLatestNonNull(n));
    }
}
