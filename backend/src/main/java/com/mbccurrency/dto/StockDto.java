// dto/StockDto.java
package com.mbccurrency.dto;

import java.time.LocalDate;

import com.mbccurrency.entity.Stock;

public class StockDto {
    private LocalDate date;
    private Double sp500;
    private Double sp500_volume;
    private Double dow_jones;
    private Double dow_jones_volume;
    private Double nasdaq;
    private Double nasdaq_volume;
    private Double kospi;
    private Double kospi_volume;
    private Double kosdaq;
    private Double kosdaq_volume;
    
	public StockDto() {	}

	public StockDto(LocalDate date, Double sp500, Double sp500_volume, Double dow_jones, Double dow_jones_volume,
			Double nasdaq, Double nasdaq_volume, Double kospi, Double kospi_volume, Double kosdaq,
			Double kosdaq_volume) {
		super();
		this.date = date;
		this.sp500 = sp500;
		this.sp500_volume = sp500_volume;
		this.dow_jones = dow_jones;
		this.dow_jones_volume = dow_jones_volume;
		this.nasdaq = nasdaq;
		this.nasdaq_volume = nasdaq_volume;
		this.kospi = kospi;
		this.kospi_volume = kospi_volume;
		this.kosdaq = kosdaq;
		this.kosdaq_volume = kosdaq_volume;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Double getSp500() {
		return sp500;
	}

	public void setSp500(Double sp500) {
		this.sp500 = sp500;
	}

	public Double getSp500_volume() {
		return sp500_volume;
	}

	public void setSp500_volume(Double sp500_volume) {
		this.sp500_volume = sp500_volume;
	}

	public Double getDow_jones() {
		return dow_jones;
	}

	public void setDow_jones(Double dow_jones) {
		this.dow_jones = dow_jones;
	}

	public Double getDow_jones_volume() {
		return dow_jones_volume;
	}

	public void setDow_jones_volume(Double dow_jones_volume) {
		this.dow_jones_volume = dow_jones_volume;
	}

	public Double getNasdaq() {
		return nasdaq;
	}

	public void setNasdaq(Double nasdaq) {
		this.nasdaq = nasdaq;
	}

	public Double getNasdaq_volume() {
		return nasdaq_volume;
	}

	public void setNasdaq_volume(Double nasdaq_volume) {
		this.nasdaq_volume = nasdaq_volume;
	}

	public Double getKospi() {
		return kospi;
	}

	public void setKospi(Double kospi) {
		this.kospi = kospi;
	}

	public Double getKospi_volume() {
		return kospi_volume;
	}

	public void setKospi_volume(Double kospi_volume) {
		this.kospi_volume = kospi_volume;
	}

	public Double getKosdaq() {
		return kosdaq;
	}

	public void setKosdaq(Double kosdaq) {
		this.kosdaq = kosdaq;
	}

	public Double getKosdaq_volume() {
		return kosdaq_volume;
	}

	public void setKosdaq_volume(Double kosdaq_volume) {
		this.kosdaq_volume = kosdaq_volume;
	}
	
	public static StockDto fromEntity(Stock e) {
        if (e == null) return null;
        return new StockDto(
          e.getDate(),
          e.getSp500(),
          e.getSp500_volume(),
          e.getDow_jones(),
          e.getDow_jones_volume(),
          e.getNasdaq(),
          e.getNasdaq_volume(),
          e.getKospi(),
          e.getKospi_volume(),
          e.getKosdaq(),
          e.getKosdaq_volume()
        );
    }
	
	
    
}
