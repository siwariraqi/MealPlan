package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.beans.GroceryList;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.bl.GroceryListBL;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.UNAUTHORIZEDException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("grocerylist")
@CrossOrigin
public class GroceryListController {
    @Autowired
    GroceryListBL groceryListBL;

    @Autowired
    UserBL userBL;



    @PostMapping("deleteIngredient")
    public ResponseEntity hideIngredientForUser(@RequestBody List<Long> grocerLisIds, @RequestParam Long userId){
        try{
            this.groceryListBL.hideIngredientsForUser(grocerLisIds, userId);
            return (ResponseEntity) ResponseEntity.ok();
        } catch (UNAUTHORIZEDException e) {
            return (ResponseEntity) ResponseEntity.notFound();
        }
    }

    @GetMapping("getIngredients/{week}")
    @ResponseBody
    public List<GroceryList> getIngredientsByWeek(@PathVariable Integer week, @RequestBody Long user_id, @RequestBody Plan plan){
        List<GroceryList> userGroceries = null;
        if(week>Integer.parseInt(plan.getLength())) return userGroceries;

        userGroceries = this.groceryListBL.getIngredientsByWeekAndPlanForUser(week, plan, user_id);
        return userGroceries;
    }


}
