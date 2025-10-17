// entity/Pca.java
package com.mbccurrency.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name = "pca")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Pca {
    @Id
    private LocalDate date;
    private Double metals_pca;
    private Double oil_pca;
    private Double commodities_pca;
    private Double grains_pca;
    private Double agri_pca;
    private Double softs_pca;
    private Double stock_pca;
    private Double us_stock_pca;
    private Double kr_stock_pca;
}
