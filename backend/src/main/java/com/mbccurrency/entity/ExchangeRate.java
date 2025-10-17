package com.mbccurrency.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "exchange")
public class ExchangeRate {

    @Id
    @Column(name = "date", nullable = false)
    private LocalDate date;       // PK로 씀(하루 1행 가정)

    @Column(name = "usd")
    private Double usd;

    @Column(name = "jpy")
    private Double jpy;

    @Column(name = "eur")
    private Double eur;

    @Column(name = "cny")
    private Double cny;

    protected ExchangeRate() {}   // JPA 기본 생성자

    public ExchangeRate(LocalDate date, Double usd, Double jpy, Double eur, Double cny) {
        this.date = date; this.usd = usd; this.jpy = jpy; this.eur = eur; this.cny = cny;
    }

    public LocalDate getDate() { return date; }
    public Double getUsd() { return usd; }
    public Double getJpy() { return jpy; }
    public Double getEur() { return eur; }
    public Double getCny() { return cny; }

}
