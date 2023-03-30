package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DietType;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MealsDAO extends JpaRepository<Meal, Long> {
    Meal findByMealName(String mealName);
    Optional<Meal> findByMealId(Long mealId);
}
