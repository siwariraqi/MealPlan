package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.GroceryList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroceryListDAO extends JpaRepository<GroceryList, Long> {
}

