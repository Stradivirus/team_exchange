// repository/PcaRepository.java
package com.mbccurrency.repository.jpa;

import com.mbccurrency.entity.Pca;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface PcaRepository extends JpaRepository<Pca, LocalDate> {}
