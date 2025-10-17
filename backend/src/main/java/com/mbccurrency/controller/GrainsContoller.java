package com.mbccurrency.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mbccurrency.dto.GrainsDto;
import com.mbccurrency.service.GrainsService;

@RestController
@RequestMapping("/api/grains")
public class GrainsContoller {

    private final GrainsService service;

    public GrainsContoller(GrainsService service) {
        this.service = service;
    }

    // 최신 1건
    @GetMapping("/latest")
    public ResponseEntity<Optional<GrainsDto>> latest() {
        return ResponseEntity.ok(service.getLatestGrains());
    }
    
    // 최신 n건
    @GetMapping("/nlatest")
    public ResponseEntity<List<GrainsDto>> latest(
            @RequestParam(name="n", defaultValue="5") int n) {
        // ✅ null 포함 행을 제외한 N건으로 교체
        return ResponseEntity.ok(service.getLatestAllNonNull(n));
    }


    // 범위 데이터
    @GetMapping("/range")
    public ResponseEntity<List<GrainsDto>> range(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(service.getGrainsByDateRange(start, end));
    }
}
