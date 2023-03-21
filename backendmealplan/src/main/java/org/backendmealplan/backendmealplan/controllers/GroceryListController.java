package org.backendmealplan.backendmealplan.controllers;
import org.backendmealplan.backendmealplan.bl.GroceryListBL;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.backendmealplan.backendmealplan.exceptions.UNAUTHORIZEDException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
            return (ResponseEntity) ResponseEntity.ok("okay");
        } catch (UNAUTHORIZEDException e) {
            return (ResponseEntity) ResponseEntity.ok("okay");//(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    //TODO:change user_id to body or header
//    @GetMapping("getIngredients/{week}/{user_id}")
//    public List<GroceryList> getIngredientsByWeek(@PathVariable Integer week, @PathVariable Long user_id){
//        //ResponseEntity<List<GroceryList>>
//        List<GroceryList> userGroceries = new ArrayList<>();
//        try {
//            userGroceries = this.groceryListBL.getIngredientsByWeekAndPlanForUser(week, user_id);
//            return userGroceries;
//        } catch (UNAUTHORIZEDException e) {
//            return userGroceries;
//            //return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
//        }
//    }

/*
    @GetMapping("getIngredients/{week}")
    public List<GroceryList> getIngredientsByWeek(@PathVariable Integer week, @RequestParam Long user_id){
        //ResponseEntity<List<GroceryList>>
        List<GroceryList> userGroceries = new ArrayList<>();
        try {
            userGroceries = this.groceryListBL.getIngredientsByWeekAndPlanForUser(week, user_id);
            return  userGroceries;
            //return ResponseEntity.ok(userGroceries);
        } catch (UNAUTHORIZEDException e) {
            return userGroceries;
            //return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

 */


}
