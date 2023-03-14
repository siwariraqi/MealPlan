package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayPlanDAO extends JpaRepository<DayPlan, Long> {

}