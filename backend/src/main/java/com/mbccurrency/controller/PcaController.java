// controller/PcaController.java
package com.mbccurrency.controller;

import com.mbccurrency.entity.Pca;
import com.mbccurrency.service.PcaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pca")
public class PcaController {
    private final PcaService service;

    public PcaController(PcaService service) {
		this.service = service;
	}

	@GetMapping
    public List<Pca> getAll() { return service.findAll(); }

    @GetMapping("/{date}")
    public Pca getOne(@PathVariable String date) {
        return service.findByDate(LocalDate.parse(date)).orElse(null);
    }
}
