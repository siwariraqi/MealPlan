package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.Exceptions.PaymentNotFoundException;
import org.backendmealplan.backendmealplan.Exceptions.UserNotFoundException;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.bl.UserBL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@CrossOrigin
public class UsersController {

@Autowired
private UserBL userBL;
  @GetMapping(name = "getdayplanmeals/{dayNumber}/{userId}")
  public ResponseEntity<List<Meal>> getDayPlanMeals(@PathVariable Integer dayNumber, @PathVariable Long userID ){

    try {
      List<Meal> meals = this.userBL.getDayPlanMeals(dayNumber,userID);
      return ResponseEntity.ok(meals);
    } catch (UserNotFoundException e) {
      return ResponseEntity.status(HttpStatus.MULTI_STATUS).build();
    } catch (PaymentNotFoundException e) {
      return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }


  }
}
