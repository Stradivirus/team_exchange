// controller/CommoditiesIndexController.java
package com.mbccurrency.controller;

import com.mbccurrency.entity.CommoditiesIndex;
import com.mbccurrency.service.CommoditiesIndexService;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/commodities-index")
public class CommoditiesIndexController {
    private final CommoditiesIndexService service;

    public CommoditiesIndexController(CommoditiesIndexService service) {
        this.service = service;
    }
    
    @GetMapping
    public List<CommoditiesIndex> getAll() { return service.findAll(); }

    @GetMapping("/{date}")
    public CommoditiesIndex getOne(@PathVariable String date) {
        return service.findByDate(LocalDate.parse(date)).orElse(null);
    }
}
