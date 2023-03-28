package org.backendmealplan.backendmealplan.other;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDTO {
    private String category;
    private String productName;
    private double amount;
    private String unit;
}
