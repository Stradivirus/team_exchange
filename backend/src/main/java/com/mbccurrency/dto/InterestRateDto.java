// dto/InterestRateDto.java
package com.mbccurrency.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class InterestRateDto {
    private LocalDate date;
    private Double kor_base_rate;
    private Double us_fed_rate;
}
