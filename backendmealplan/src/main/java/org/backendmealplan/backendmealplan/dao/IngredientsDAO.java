package org.backendmealplan.backendmealplan.dao;

import org.backendmealplan.backendmealplan.beans.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientsDAO extends JpaRepository<Ingredient, Long> {
}