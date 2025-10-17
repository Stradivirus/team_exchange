// dto/CommoditiesIndexDto.java
package com.mbccurrency.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CommoditiesIndexDto {
    private LocalDate date;
    private Double dxy;
    private Double vix;
}
