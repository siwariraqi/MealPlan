package org.backendmealplan.backendmealplan.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
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

    @NotBlank
    private String mealName;

    @NotBlank
    private String imageUrl;

    @NotNull
    private int calories;

    @NotBlank
    @Column(name = "instructions", length = 2500)
    private String instructions;

    @NotNull
    private String prepareTime;

    @NotNull
    private String cookTime;

    @NotNull
    private double fat;
    @NotNull
    private double protein;
    @NotNull
    private double carbs;
    @NotNull
    private double fibre;
    @NotBlank
    private String tips;

    @ManyToMany
    @Fetch(FetchMode.JOIN) // Eagerly load the collection
    @JoinTable(
            name = "meal_diet_types",
            joinColumns = @JoinColumn(name = "meal_id"),
            inverseJoinColumns = @JoinColumn(name = "diet_type_id"))
    Set<DietType> dietTypes;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "meal")
    private List<UserFeedback> feedbacks = new ArrayList<>();

    @JsonIgnore
    @ToString.Exclude
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
