// entity/CommoditiesIndex.java
package com.mbccurrency.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name = "commodities_index")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CommoditiesIndex {
    @Id
    private LocalDate date;
    private Double dxy;
    private Double vix;
}
