package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GoalsDAO extends JpaRepository<Goal, Long> {
    List<Goal> findByText(String text);
}