package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface GoalsDAO extends JpaRepository<Goal, Long> {

    //@Query(value ="select * from goals where :text in elements(goals.text)", nativeQuery = true)
    List<Goal> findByTextIn(Collection<String> texts);



=======
import java.util.List;

public interface GoalsDAO extends JpaRepository<Goal, Long> {
    List<Goal> findByText(String text);
>>>>>>> 35d1d192c6c77056c3b58d1bbe1c7c6f947e9cb3
}