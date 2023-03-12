package org.backendmealplan.backendmealplan.beans;
import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table(name = "meal_ingredients")
public class MealIngredients {

    @EmbeddedId
    private MealIngredientId id;
    private double amount;
    private String unit;

}
