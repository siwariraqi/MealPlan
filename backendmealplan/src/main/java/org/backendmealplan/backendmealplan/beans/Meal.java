package org.backendmealplan.backendmealplan.beans;
import lombok.*;
import org.backendmealplan.backendmealplan.enums.DietType;

import javax.persistence.*;
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
    @Column(name = "instructions", length = 1000)
    private String instructions;
    private String prepareTime;
    private String cookTime;
    private double fat;
    private double protein;
    private double carbs;
    private double fiber;
    private String tips;
//    private List<DietType> dietTypeList;

    @OneToMany (mappedBy = "meal")
    private List<UserFeedback> feedbacks;

    @ManyToMany
    @JoinTable(
            name = "meal_ingredients",
            joinColumns = @JoinColumn(name = "meal_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    Set<Ingredient> mealIngredients;


    @ManyToMany(mappedBy = "meals")
    List<DayPlanId> dayPlanId;
}