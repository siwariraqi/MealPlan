package org.backendmealplan.backendmealplan.beans;
import lombok.Data;
import org.backendmealplan.backendmealplan.enums.FoodCategories;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ingredientId;
    private String category;
    private String productName;

    @ManyToMany(mappedBy = "mealIngredients")
    List<Meal> mealList;

}
