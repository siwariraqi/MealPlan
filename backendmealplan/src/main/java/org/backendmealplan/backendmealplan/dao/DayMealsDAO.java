package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DayMealsDAO extends JpaRepository<DayMeal, Long> {

//    List<DayMeal> findDayMealsByDayMealKey(Long dayPlanId);

}
