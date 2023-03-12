package org.backendmealplan.backendmealplan.beans;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;


@Data
public class MealIngredientId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

}