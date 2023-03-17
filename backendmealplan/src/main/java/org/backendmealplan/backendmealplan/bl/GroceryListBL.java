package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.GroceryList;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.dao.GroceryListDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.backendmealplan.backendmealplan.exceptions.UNAUTHORIZEDException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroceryListBL {
    @Autowired
    GroceryListDAO groceryListDAO;

    @Autowired
    UserBL userBL;

    public void hideIngredientsForUser(List<Long> ingredientIds, Long userId) throws UNAUTHORIZEDException {

        List<GroceryList> groceryListItems = this.groceryListDAO.findByGroceryIdIn(ingredientIds);
        if(groceryListItems == null){
            throw new UNAUTHORIZEDException("groceryListItem does not Exist");
        }
        this.userBL.addGroceryChangeToUser(userId,groceryListItems);
    }

    public List<GroceryList> getIngredientsByWeekAndPlanForUser(Integer week, Plan plan, Long user_id) throws UNAUTHORIZEDException {
        List<GroceryList> allWeekGroceries = this.groceryListDAO.findByWeekAndPlan(week,plan);
        List<GroceryList> deletedGroceries = this.userBL.getDeletedGroceries(user_id);
        List<GroceryList> filteredList = allWeekGroceries.stream()
                .filter(groceryList -> deletedGroceries.contains(groceryList))
                .collect(Collectors.toList());

        return filteredList;
    }
}
