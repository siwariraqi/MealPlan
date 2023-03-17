package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.backendmealplan.backendmealplan.bl.FeedbackBL;
import org.backendmealplan.backendmealplan.exceptions.MealNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("feedback")
@CrossOrigin
public class FeedbackController {

  @Autowired
  private FeedbackBL feedbackBL;
  @PostMapping(name = "save/{userId}/{mealId}")
  public ResponseEntity<Integer> saveFeedback (@RequestBody UserFeedback userFeedback, @PathVariable Long userId , @PathVariable Long mealId ){
    try {
    Integer number =  feedbackBL.saveFeedback(userFeedback,userId,mealId);
      return ResponseEntity.ok(number);
    }  catch (userNotFoundException | MealNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }


}

