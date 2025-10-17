package com.mbccurrency.dto;

import java.time.LocalDate;
import com.mbccurrency.entity.Grains;

public class GrainsDto {

    private LocalDate date;
    private Double corn;
    private Double corn_volume;
    private Double wheat;
    private Double wheat_volume;
    private Double rice;
    private Double rice_volume;
    private Double coffee;
    private Double coffee_volume;
    private Double sugar;
    private Double sugar_volume;

    public GrainsDto() {}

    public GrainsDto(
            LocalDate date,
            Double corn, Double corn_volume,
            Double wheat, Double wheat_volume,
            Double rice, Double rice_volume,
            Double coffee, Double coffee_volume,
            Double sugar, Double sugar_volume
    ) {
        this.date = date;
        this.corn = corn;
        this.corn_volume = corn_volume;
        this.wheat = wheat;
        this.wheat_volume = wheat_volume;
        this.rice = rice;
        this.rice_volume = rice_volume;
        this.coffee = coffee;
        this.coffee_volume = coffee_volume;
        this.sugar = sugar;
        this.sugar_volume = sugar_volume;
    }

    public LocalDate getDate() { return date; }

    public Double getCorn() { return corn; }

    public Double getCorn_volume() { return corn_volume; }

    public Double getWheat() { return wheat; }

    public Double getWheat_volume() { return wheat_volume; }

    public Double getRice() { return rice; }

    public Double getRice_volume() { return rice_volume; }

    public Double getCoffee() { return coffee; }

    public Double getCoffee_volume() { return coffee_volume; }

    public Double getSugar() { return sugar; }

    public Double getSugar_volume() { return sugar_volume; }
    
    public static GrainsDto fromEntity(Grains e) {
        if (e == null) return null;
        return new GrainsDto(
            e.getDate(),
            e.getCorn(),
            e.getCornVolume(),
            e.getWheat(),
            e.getWheatVolume(),
            e.getRice(),
            e.getRiceVolume(),
            e.getCoffee(),
            e.getCoffeeVolume(),
            e.getSugar(),
            e.getSugarVolume()
        );
    }
}
