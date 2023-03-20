package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.DayPlan;
import org.backendmealplan.backendmealplan.beans.DayPlanKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DayPlanDAO extends JpaRepository<DayPlan, Long> {

    List<DayPlan> findByDayPlanKey(DayPlanKey dayPlanKey);
}