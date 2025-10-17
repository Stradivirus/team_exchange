package com.mbccurrency.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "commodities")
public class Commodities {
	
	@Id
	@Column(name = "date")
	private LocalDate date;
	
	@Column(name = "gold")
	private Double gold;

	@Column(name = "gold_volume")
	private Double gold_volume;
	
	@Column(name = "silver")
	private Double silver;
	
	@Column(name = "silver_volume")
	private Double silver_volume;
	
	@Column(name = "copper")
	private Double copper;

	@Column(name = "copper_volume")
	private Double copper_volume;
	
	@Column(name = "crude_oil")
	private Double crude_oil;
	
	@Column(name = "crude_oil_volume")
	private Double crude_oil_volume;
	
	@Column(name = "brent_oil")
	private Double brent_oil;
	
	@Column(name = "brent_oil_volume")
	private Double brent_oil_volume;

	protected Commodities() {}

	public Commodities(LocalDate date, Double gold, Double gold_volume, Double silver, Double silver_volume,
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

	public LocalDate getDate() {
		return date;
	}

	public Double getGold() {
		return gold;
	}

	public Double getGold_volume() {
		return gold_volume;
	}

	public Double getSilver() {
		return silver;
	}

	public Double getSilver_volume() {
		return silver_volume;
	}

	public Double getCopper() {
		return copper;
	}

	public Double getCopper_volume() {
		return copper_volume;
	}

	public Double getCrude_oil() {
		return crude_oil;
	}

	public Double getCrude_oil_volume() {
		return crude_oil_volume;
	}

	public Double getBrent_oil() {
		return brent_oil;
	}

	public Double getBrent_oil_volume() {
		return brent_oil_volume;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public void setGold(Double gold) {
		this.gold = gold;
	}

	public void setGold_volume(Double gold_volume) {
		this.gold_volume = gold_volume;
	}

	public void setSilver(Double silver) {
		this.silver = silver;
	}

	public void setSilver_volume(Double silver_volume) {
		this.silver_volume = silver_volume;
	}

	public void setCopper(Double copper) {
		this.copper = copper;
	}

	public void setCopper_volume(Double copper_volume) {
		this.copper_volume = copper_volume;
	}

	public void setCrude_oil(Double crude_oil) {
		this.crude_oil = crude_oil;
	}

	public void setCrude_oil_volume(Double crude_oil_volume) {
		this.crude_oil_volume = crude_oil_volume;
	}

	public void setBrent_oil(Double brent_oil) {
		this.brent_oil = brent_oil;
	}

	public void setBrent_oil_volume(Double brent_oil_volume) {
		this.brent_oil_volume = brent_oil_volume;
	}
	
}
