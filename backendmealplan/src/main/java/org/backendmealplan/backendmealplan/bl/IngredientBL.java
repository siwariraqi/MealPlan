package org.backendmealplan.backendmealplan.bl;
import org.backendmealplan.backendmealplan.beans.Ingredient;
import org.backendmealplan.backendmealplan.dao.IngredientsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientBL {

    @Autowired
    IngredientsDAO ingredientsDAO;
    public Ingredient addIngredient(Ingredient ingredient) {
        //check if ingredient exists
        List<Ingredient> ingredients = this.ingredientsDAO.findByProductName(ingredient.getProductName());
        if (ingredients.isEmpty()) {
            this.ingredientsDAO.save(ingredient);
        }
        return ingredient;
    }

    public List<Ingredient> getIngredients(){
        return this.ingredientsDAO.findAll();
    }
}
