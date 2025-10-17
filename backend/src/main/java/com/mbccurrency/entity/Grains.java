package com.mbccurrency.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

//entity/Grains.java
@Entity
@Table(name = "grains")
@Getter @Setter
public class Grains {
 @Id
 private LocalDate date;

 private Double corn;

 @Column(name = "corn_volume")
 private Double cornVolume;

 private Double wheat;

 @Column(name = "wheat_volume")
 private Double wheatVolume;

 private Double rice;

 @Column(name = "rice_volume")
 private Double riceVolume;

 private Double coffee;

 @Column(name = "coffee_volume")
 private Double coffeeVolume;

 private Double sugar;

 @Column(name = "sugar_volume")
 private Double sugarVolume;

 public LocalDate getDate() {
	return date;
 }

 public void setDate(LocalDate date) {
	this.date = date;
 }

 public Double getCorn() {
	return corn;
 }

 public void setCorn(Double corn) {
	this.corn = corn;
 }

 public Double getCornVolume() {
	return cornVolume;
 }

 public void setCornVolume(Double cornVolume) {
	this.cornVolume = cornVolume;
 }

 public Double getWheat() {
	return wheat;
 }

 public void setWheat(Double wheat) {
	this.wheat = wheat;
 }

 public Double getWheatVolume() {
	return wheatVolume;
 }

 public void setWheatVolume(Double wheatVolume) {
	this.wheatVolume = wheatVolume;
 }

 public Double getRice() {
	return rice;
 }

 public void setRice(Double rice) {
	this.rice = rice;
 }

 public Double getRiceVolume() {
	return riceVolume;
 }

 public void setRiceVolume(Double riceVolume) {
	this.riceVolume = riceVolume;
 }

 public Double getCoffee() {
	return coffee;
 }

 public void setCoffee(Double coffee) {
	this.coffee = coffee;
 }

 public Double getCoffeeVolume() {
	return coffeeVolume;
 }

 public void setCoffeeVolume(Double coffeeVolume) {
	this.coffeeVolume = coffeeVolume;
 }

 public Double getSugar() {
	return sugar;
 }

 public void setSugar(Double sugar) {
	this.sugar = sugar;
 }

 public Double getSugarVolume() {
	return sugarVolume;
 }

 public void setSugarVolume(Double sugarVolume) {
	this.sugarVolume = sugarVolume;
 }
 
}

