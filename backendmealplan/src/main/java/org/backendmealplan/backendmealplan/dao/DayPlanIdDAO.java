package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayPlanId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DayPlanIdDAO extends JpaRepository<DayPlanId, Long> {

    List<DayPlanId> findByDayPlanId(Long id);
}