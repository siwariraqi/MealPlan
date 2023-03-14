package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface GoalsDAO extends JpaRepository<Goal, Long> {

  //@Query(value ="select * from goals where :text in elements(goals.text)", nativeQuery = true)
  List<Goal> findByTextIn(Collection<String> texts);

  List<Goal> findByText(String text);
}
