// controller/InterestRateController.java
package com.mbccurrency.controller;

import com.mbccurrency.entity.InterestRate;
import com.mbccurrency.service.InterestRateService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/interest-rate")
public class InterestRateController {
    private final InterestRateService service;

    public InterestRateController(InterestRateService service) {
		this.service = service;
	}

	@GetMapping
    public List<InterestRate> getAll() { return service.findAll(); }

    @GetMapping("/{date}")
    public InterestRate getOne(@PathVariable String date) {
        return service.findByDate(LocalDate.parse(date)).orElse(null);
    }
}
