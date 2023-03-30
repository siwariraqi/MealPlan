package org.backendmealplan.backendmealplan.beans;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.backendmealplan.backendmealplan.enums.Unit;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "meal_ingredients")
public class MealIngredients {

    @EmbeddedId
    private MealIngredientId id;
    private double amount;
    private String unit;
    public void setUnit(String unit) {
        try {
            Unit.valueOf(unit);
            this.unit = unit;
        } catch (IllegalArgumentException e) {
            this.unit = null;
            System.out.println("Invalid unit value entered");
        }
    }
}
