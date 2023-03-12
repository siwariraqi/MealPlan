package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealsDAO extends JpaRepository<Meal, Long> {
}
