package org.backendmealplan.backendmealplan.other;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MealDTO {

    private String mealName;
    private String imageUrl;
    private int calories;
    private String instructions;
    private String prepareTime;
    private String cookTime;
    private double fat;
    private double protein;
    private double carbs;
    private double fibre;
    private String tips;

    List<String> dietTypes = new ArrayList<>();
    List<IngredientDTO> ingredients = new ArrayList<>();


    List<DayMealDTO> dayMealDTOList = new ArrayList<>();

}
