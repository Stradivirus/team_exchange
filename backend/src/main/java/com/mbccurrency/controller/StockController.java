// controller/StockController.java
package com.mbccurrency.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mbccurrency.dto.StockDto;
import com.mbccurrency.entity.Stock;
import com.mbccurrency.service.StockService;

@RestController
@RequestMapping("/api/stock")
public class StockController {
    private final StockService service;

    public StockController(StockService service) {
		this.service = service;
	}

	@GetMapping
    public List<Stock> getAll() { return service.findAll(); }

    @GetMapping("/{date}")
    public Stock getOne(@PathVariable String date) {
        return service.findByDate(LocalDate.parse(date)).orElse(null);
    }
    

    // 최신 1건
    @GetMapping("/latest")
    public ResponseEntity<Optional<StockDto>> latest() {
        return ResponseEntity.ok(service.getLatestStock());
    }
    
    // 최신 n건
    @GetMapping("/nlatest")
    public ResponseEntity<List<StockDto>> latest(
            @RequestParam(name="n", defaultValue="5") int n) {
        // ✅ null 포함 행을 제외한 N건으로 교체
        return ResponseEntity.ok(service.getLatestAllNonNull(n));
    }


    // 범위 데이터
    @GetMapping("/range")
    public ResponseEntity<List<StockDto>> range(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(service.getStockByDateRange(start, end));
    }
}
