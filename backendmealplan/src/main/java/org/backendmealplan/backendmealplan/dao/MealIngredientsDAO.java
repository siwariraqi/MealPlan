package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.MealIngredients;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealIngredientsDAO extends JpaRepository<MealIngredients, Long> {
//    boolean existsByMealIdAndIngredientId(Long mealId,Long ingredientId);
}
