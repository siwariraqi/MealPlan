package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlansDAO extends JpaRepository<Plan, Long> {
    Plan findPlanByPlanId(Long id);

    List<Plan> findByPlanName(String planName);
    List<Plan> findAll();

}
