package com.mbccurrency.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsSentimentDto {
    private LocalDate date;
    private Double value;
    private String statCode;
    private String itemCode;
    private String itemName;
    private String unitName;
    private LocalDateTime createdAt;
}
