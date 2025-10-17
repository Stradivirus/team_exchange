// repository/InterestRateRepository.java
package com.mbccurrency.repository.jpa;

import com.mbccurrency.entity.InterestRate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface InterestRateRepository extends JpaRepository<InterestRate, LocalDate> {}
