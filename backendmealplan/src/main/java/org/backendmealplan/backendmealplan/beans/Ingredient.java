package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ingredientId;

    @NotBlank
    private String category;
    @NotBlank
    private String productName;

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(mappedBy = "mealIngredients")
    List<Meal> mealList;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany (mappedBy = "ingredient")
    private List<GroceryList> groceryLists;

}
