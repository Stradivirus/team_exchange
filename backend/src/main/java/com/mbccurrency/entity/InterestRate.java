// entity/InterestRate.java
package com.mbccurrency.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name = "interest_rate")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class InterestRate {
    @Id
    private LocalDate date;
    private Double kor_base_rate;
    private Double us_fed_rate;
}
