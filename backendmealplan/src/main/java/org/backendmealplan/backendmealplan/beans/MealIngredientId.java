package org.backendmealplan.backendmealplan.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealIngredientId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

}