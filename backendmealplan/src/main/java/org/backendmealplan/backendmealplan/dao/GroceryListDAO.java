package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.GroceryList;
import org.backendmealplan.backendmealplan.beans.Ingredient;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroceryListDAO extends JpaRepository<GroceryList, Long> {
    List<GroceryList> findByGroceryIdIn(List<Long> groceryIdList);
    List<GroceryList> findByWeekAndPlan(Integer week, Plan plan);
    List<GroceryList> findByWeekAndIngredientAndUnit(Integer week, Ingredient ingredient, String unit);
}

