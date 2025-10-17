package com.mbccurrency.service;

import com.mbccurrency.entity.ExchangeRate;
import com.mbccurrency.repository.jpa.PgExchangeRateRepository;
import com.mbccurrency.dto.ExchangeRateDto;
import com.mbccurrency.dto.SeriesPoint;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import java.util.*;
import java.util.function.Function;

@Service
public class ExchangeService {

    private final PgExchangeRateRepository repo;

    public ExchangeService(PgExchangeRateRepository repo) {
        this.repo = repo;
    }

    @Transactional(readOnly = true)
    public List<ExchangeRateDto> getRange(LocalDate start, LocalDate end) {
        List<ExchangeRate> rows = repo.findByDateBetweenOrderByDateAsc(start, end);
        List<ExchangeRateDto> out = new ArrayList<>(rows.size());
        for (ExchangeRate r : rows) {
            out.add(new ExchangeRateDto(
                    r.getDate(), r.getUsd(), r.getJpy(), r.getEur(), r.getCny()
            ));
        }
        return out;
    }

    @Transactional(readOnly = true)
    public ExchangeRateDto getLatest() {
        ExchangeRate r = repo.findTopByOrderByDateDesc()
                .orElseThrow(() -> new NoSuchElementException("최신 데이터가 없습니다."));
        return new ExchangeRateDto(r.getDate(), r.getUsd(), r.getJpy(), r.getEur(), r.getCny());
    }

    // 단일 통화 시계열 (usd/jpy/eur/cny)
    @Transactional(readOnly = true)
    public List<SeriesPoint> getSeries(String currency, LocalDate start, LocalDate end) {
        String cur = currency.toLowerCase(Locale.ROOT);
        Function<ExchangeRate, Double> pick = switch (cur) {
            case "usd" -> ExchangeRate::getUsd;
            case "jpy" -> ExchangeRate::getJpy;
            case "eur" -> ExchangeRate::getEur;
            case "cny" -> ExchangeRate::getCny;
            default -> throw new IllegalArgumentException("지원하지 않는 통화: " + currency);
        };

        List<ExchangeRate> rows = repo.findByDateBetweenOrderByDateAsc(start, end);
        List<SeriesPoint> out = new ArrayList<>(rows.size());
        for (ExchangeRate r : rows) {
            out.add(new SeriesPoint(r.getDate(), pick.apply(r)));
        }
        return out;
    }
    
    public List<ExchangeRate> getLatest(int n) {
        return repo.findLatest(n);
    }

    public List<ExchangeRate> getRange(int years) {
        LocalDate end = LocalDate.now();
        LocalDate start = (years == 0) ? LocalDate.of(1970, 1, 1) : end.minusYears(years);
        return repo.findByDateBetween(start, end);
    }
}
