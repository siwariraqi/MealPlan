package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlansDAO extends JpaRepository<Plan, Long> {
    Plan findPlanByplanId(Long id);
}
