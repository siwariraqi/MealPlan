package org.backendmealplan.backendmealplan.other;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDTO {
    private String category;
    private String productName;
    private Optional<Double> amount;
    private Optional<String> unit;

    public IngredientDTO(String category, String productName, Double amount, String unit) {
        this.category = category;
        this.productName = productName;
        this.amount = Optional.ofNullable(amount);
        this.unit = Optional.ofNullable(unit);
    }
}
