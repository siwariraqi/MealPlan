package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealIngredientId implements Serializable {

  @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

}
