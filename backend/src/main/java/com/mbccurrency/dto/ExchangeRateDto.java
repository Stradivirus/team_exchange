package com.mbccurrency.dto;

import java.time.LocalDate;

public class ExchangeRateDto {
    private LocalDate date;
    private Double usd;
    private Double jpy;
    private Double eur;
    private Double cny;
    
	public ExchangeRateDto() {
	}

	public ExchangeRateDto(LocalDate date, Double usd, Double jpy, Double eur, Double cny) {
		super();
		this.date = date;
		this.usd = usd;
		this.jpy = jpy;
		this.eur = eur;
		this.cny = cny;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Double getUsd() {
		return usd;
	}

	public void setUsd(Double usd) {
		this.usd = usd;
	}

	public Double getJpy() {
		return jpy;
	}

	public void setJpy(Double jpy) {
		this.jpy = jpy;
	}

	public Double getEur() {
		return eur;
	}

	public void setEur(Double eur) {
		this.eur = eur;
	}

	public Double getCny() {
		return cny;
	}

	public void setCny(Double cny) {
		this.cny = cny;
	}
	
    
    
}
