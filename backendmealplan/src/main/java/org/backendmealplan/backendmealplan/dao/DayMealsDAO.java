package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.DayMealKey;
import org.backendmealplan.backendmealplan.beans.DayPlanId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DayMealsDAO extends JpaRepository<DayMeal, DayMealKey> {

    @Query(value = "SELECT * FROM mealplan.day_meals join mealplan.day_plan using (day_plan_id)" +
            "where day_number=:dayNumber", nativeQuery = true)
    List<DayMeal> getMealsOfDay(Long dayNumber);

    List<DayMeal> findByIdPlanDayIdAndType(DayPlanId planDayId, String type);
}
