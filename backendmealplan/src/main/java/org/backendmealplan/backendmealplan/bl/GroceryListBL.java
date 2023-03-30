package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.GroceryListDAO;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.backendmealplan.backendmealplan.exceptions.MealNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.UNAUTHORIZEDException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroceryListBL {
    @Autowired
    GroceryListDAO groceryListDAO;

    @Autowired
    UserBL userBL;

    @Autowired
    MealBL mealBL;

    @Autowired
    MealsDAO mealsDAO;


    public void hideIngredientsForUser(List<Long> ingredientIds, Long userId) throws UNAUTHORIZEDException {
        List<GroceryList> groceryListItems = null;
        try{
            groceryListItems= this.groceryListDAO.findByGroceryIdIn(ingredientIds);
            this.userBL.addGroceryChangeToUser(userId,groceryListItems);
        }
        catch (Exception e){
            throw new UNAUTHORIZEDException("findByGroceryDidNotWork");
        }
        if(groceryListItems == null){
            throw new UNAUTHORIZEDException("groceryListItem does not Exist");
        }
    }

    public List<GroceryList> getIngredientsByWeekAndPlanForUser(Integer week, Long user_id) throws UNAUTHORIZEDException {
        Plan plan = userBL.getUserPlan(user_id);
        if(plan == null) throw new UNAUTHORIZEDException("plan does not exist");
        List<GroceryList> allWeekGroceries = this.groceryListDAO.findByWeekAndPlan(week,plan);
        List<GroceryList> deletedGroceries = this.userBL.getDeletedGroceries(user_id);
        List<GroceryList> filteredList = allWeekGroceries.stream()
                .filter(groceryList -> {return deletedGroceries.contains(groceryList)!=true;})
                .collect(Collectors.toList());

        return filteredList;
    }

    public void addMealIngredientsToGroceries(Plan plan, Meal currentMeal, Integer week){
        try {
            List<MealIngredients> ingredients = mealBL.getDayPlanMealIngredients(currentMeal.getMealId());
            for(MealIngredients ingredient : ingredients){
                List<GroceryList> list = groceryListDAO.findByWeekAndIngredientAndUnitAndPlanPlanId(week, ingredient.getId().getIngredient(), ingredient.getUnit(), plan.getPlanId());
                if(list.size() == 1){
                    GroceryList found = list.get(0);
                    found.setAmount((int) (found.getAmount()+ingredient.getAmount()));
                    groceryListDAO.save(found);
                }
                else if(list.size() == 0){
                    GroceryList newGroceryList = new GroceryList();
                    newGroceryList.setIngredient(ingredient.getId().getIngredient());
                    newGroceryList.setWeek(week);
                    newGroceryList.setAmount((int) ingredient.getAmount());
                    newGroceryList.setPlan(plan);
                    newGroceryList.setUnit(ingredient.getUnit());
                    groceryListDAO.save(newGroceryList);
                }
            }
        } catch (MealNotFoundException e) {
            e.printStackTrace();
        }
    }
}
