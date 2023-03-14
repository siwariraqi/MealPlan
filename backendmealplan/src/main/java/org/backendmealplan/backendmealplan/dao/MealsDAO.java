package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealsDAO extends JpaRepository<Meal, Long> {
    List<Meal> findByMealName(String mealName);
}
