package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.DayMealKey;
import org.backendmealplan.backendmealplan.beans.DayPlanId;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DayMealsDAO extends JpaRepository<DayMeal, DayMealKey> {

    //    List<DayMeal> findDayMealsByDayMealKey(Long dayPlanId);
    @Query(value = "SELECT * FROM mealplan.day_meals join mealplan.day_plan using (day_plan_id)" +
            "where day_number=:dayNumber AND day_plan.plan_id=:planId", nativeQuery = true)
    List<DayMeal> getMealsOfDay(Long dayNumber, Long planId);

    List<DayMeal> findByIdPlanDayIdAndType(DayPlanId planDayId, String type);

    @Query(value="SELECT * FROM mealplan.day_meals where day_plan_id=:dayPlanId", nativeQuery = true)
    List<DayMeal> findByIdPlanDayId(DayPlanId dayPlanId);
}
