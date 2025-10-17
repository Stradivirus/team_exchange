// src/main/java/com/mbccurrency/api/dto/SeriesPoint.java
package com.mbccurrency.dto;

import java.time.LocalDate;

public class SeriesPoint {
    private LocalDate date;
    private Double value;

    public SeriesPoint(LocalDate date, Double value) {
        this.date = date; this.value = value;
    }
    public LocalDate getDate() { return date; }
    public Double getValue() { return value; }
}
