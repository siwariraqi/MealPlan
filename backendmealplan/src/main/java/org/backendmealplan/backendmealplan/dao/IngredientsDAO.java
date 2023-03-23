package org.backendmealplan.backendmealplan.dao;
import org.backendmealplan.backendmealplan.beans.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientsDAO extends JpaRepository<Ingredient, Long> {

    List<Ingredient> findByProductName(String text);
    List<Ingredient> findAll();

}