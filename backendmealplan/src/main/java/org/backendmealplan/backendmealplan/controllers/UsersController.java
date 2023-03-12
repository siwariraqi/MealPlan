package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.Exceptions.userNotFoundException;
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
  @GetMapping(name = "getDayPlanMeals/{dayNumber}/{userId}")
  public ResponseEntity getDayPlanMeals(@PathVariable Integer dayNumber, @PathVariable Long userID ){

    try {
      List<Meal> meals = this.userBL.getDayPlanMeals(dayNumber,userID);
      return ResponseEntity.ok(meals);
    } catch (userNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


  }
}
