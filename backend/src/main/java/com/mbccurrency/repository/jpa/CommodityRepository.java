package com.mbccurrency.repository.jpa;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mbccurrency.entity.Commodities;

public interface CommodityRepository extends JpaRepository<Commodities, LocalDate>  {

}
