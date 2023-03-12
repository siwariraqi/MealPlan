package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface dayPlanDAO extends JpaRepository<DayPlan, Long> {

}