// dto/CommoditiesDto.java
package com.mbccurrency.dto;

import java.time.LocalDate;

import com.mbccurrency.entity.Commodities;

public class CommoditiesDto {
    private LocalDate date;
    private Double gold;
    private Double gold_volume;
    private Double silver;
    private Double silver_volume;
    private Double copper;
    private Double copper_volume;
    private Double crude_oil;
    private Double crude_oil_volume;
    private Double brent_oil;
    private Double brent_oil_volume;
    
    public CommoditiesDto() {
	}

	

	public CommoditiesDto(LocalDate date, Double gold, Double gold_volume, Double silver, Double silver_volume,
			Double copper, Double copper_volume, Double crude_oil, Double crude_oil_volume, Double brent_oil,
			Double brent_oil_volume) {
		super();
		this.date = date;
		this.gold = gold;
		this.gold_volume = gold_volume;
		this.silver = silver;
		this.silver_volume = silver_volume;
		this.copper = copper;
		this.copper_volume = copper_volume;
		this.crude_oil = crude_oil;
		this.crude_oil_volume = crude_oil_volume;
		this.brent_oil = brent_oil;
		this.brent_oil_volume = brent_oil_volume;
	}

	public static CommoditiesDto fromEntity(Commodities e) {
        if (e == null) return null;
        return new CommoditiesDto(
        	e.getDate(),
        	e.getGold(),
        	e.getGold_volume(),
        	e.getSilver(),
        	e.getSilver_volume(),
        	e.getCopper(),
        	e.getCopper_volume(),
        	e.getCrude_oil(),
        	e.getCrude_oil_volume(),
        	e.getBrent_oil(),
        	e.getBrent_oil_volume()
        );
    }

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Double getGold() {
		return gold;
	}

	public void setGold(Double gold) {
		this.gold = gold;
	}

	public Double getGold_volume() {
		return gold_volume;
	}

	public void setGold_volume(Double gold_volume) {
		this.gold_volume = gold_volume;
	}

	public Double getSilver() {
		return silver;
	}

	public void setSilver(Double silver) {
		this.silver = silver;
	}

	public Double getSilver_volume() {
		return silver_volume;
	}

	public void setSilver_volume(Double silver_volume) {
		this.silver_volume = silver_volume;
	}

	public Double getCopper() {
		return copper;
	}

	public void setCopper(Double copper) {
		this.copper = copper;
	}

	public Double getCopper_volume() {
		return copper_volume;
	}

	public void setCopper_volume(Double copper_volume) {
		this.copper_volume = copper_volume;
	}

	public Double getCrude_oil() {
		return crude_oil;
	}

	public void setCrude_oil(Double crude_oil) {
		this.crude_oil = crude_oil;
	}

	public Double getCrude_oil_volume() {
		return crude_oil_volume;
	}

	public void setCrude_oil_volume(Double crude_oil_volume) {
		this.crude_oil_volume = crude_oil_volume;
	}

	public Double getBrent_oil() {
		return brent_oil;
	}

	public void setBrent_oil(Double brent_oil) {
		this.brent_oil = brent_oil;
	}

	public Double getBrent_oil_volume() {
		return brent_oil_volume;
	}

	public void setBrent_oil_volume(Double brent_oil_volume) {
		this.brent_oil_volume = brent_oil_volume;
	}
}
