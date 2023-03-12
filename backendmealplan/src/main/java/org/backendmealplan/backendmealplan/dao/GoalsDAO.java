package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalsDAO extends JpaRepository<Goal, Long> {

}