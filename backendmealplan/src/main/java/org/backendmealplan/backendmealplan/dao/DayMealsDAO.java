package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayMealsDAO extends JpaRepository<DayMeal, Long> {

}
