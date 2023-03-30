package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayPlan;
import org.backendmealplan.backendmealplan.beans.DayPlanKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DayPlanDAO extends JpaRepository<DayPlan, Long> {

    DayPlan findByDayPlanKey(DayPlanKey dayPlanKey);

    @Query(value = "SELECT * FROM mealplan.day_plan where plan_id=:planId",nativeQuery = true)
    List<DayPlan> getDayNumbers(Long planId);

    @Query(value = "SELECT * FROM mealplan.day_plan where plan_id=:planId AND day_number=:dayNumber",nativeQuery = true)
    Optional<DayPlan> getDayNumber(Long planId,Integer dayNumber);
}