// controller/CommoditiesController.java
package com.mbccurrency.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mbccurrency.dto.CommoditiesDto;
import com.mbccurrency.entity.Commodities;
import com.mbccurrency.service.CommoditiesService;

@RestController
@RequestMapping("/api/commodities")
public class CommoditiesController {
    private final CommoditiesService service;

    public CommoditiesController(CommoditiesService service) {
		this.service = service;
	}

	@GetMapping
    public List<Commodities> getAll() { return service.findAll(); }

    @GetMapping("/{date}")
    public Commodities getOne(@PathVariable String date) {
        return service.findByDate(LocalDate.parse(date)).orElse(null);
    }
    
 // 최신 n건
    @GetMapping("/nlatest")
    public ResponseEntity<List<CommoditiesDto>> latest(
            @RequestParam(name="n", defaultValue="5") int n) {
        // ✅ null 포함 행을 제외한 N건으로 교체
        return ResponseEntity.ok(service.getLatestAllNonNull(n));
    }
}
