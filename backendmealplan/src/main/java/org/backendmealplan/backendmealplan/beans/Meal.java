package org.backendmealplan.backendmealplan.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "meals")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mealId;
    private String mealName;
    private String imageUrl;
    private int calories;
    @Column(name = "instructions", length = 2500)
    private String instructions;
    private String prepareTime;
    private String cookTime;
    private double fat;
    private double protein;
    private double carbs;
    private double fiber;
    private String tips;
//    private List<DietType> dietTypeList;

  @ToString.Exclude
  @JsonIgnore
    @OneToMany (mappedBy = "meal")
    private List<UserFeedback> feedbacks = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "meal_ingredients",
            joinColumns = @JoinColumn(name = "meal_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    Set<Ingredient> mealIngredients;

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(mappedBy = "meals")
    List<DayPlanId> dayPlanId;
}
