package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
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

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(mappedBy = "mealIngredients")
    List<Meal> mealList;

}
