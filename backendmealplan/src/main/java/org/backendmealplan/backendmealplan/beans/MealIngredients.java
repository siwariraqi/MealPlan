package org.backendmealplan.backendmealplan.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

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

}
