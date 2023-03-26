package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.backendmealplan.backendmealplan.bl.FeedbackBL;
import org.backendmealplan.backendmealplan.exceptions.FeedbackNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.MealNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.RatingNotInRangeException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("feedback")
@CrossOrigin
public class FeedbackController {

    @Autowired
    private FeedbackBL feedbackBL;

    @PostMapping("save/{userId}/{mealId}")
    public ResponseEntity<Integer> saveFeedback(@RequestBody UserFeedback userFeedback, @PathVariable Long userId, @PathVariable Long mealId) {
        try {
            Integer number = feedbackBL.saveFeedback(userFeedback, userId, mealId);
            return ResponseEntity.ok(number);
        } catch (userNotFoundException | MealNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (RatingNotInRangeException e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

  @GetMapping("/getall")
  public ResponseEntity <List<UserFeedback>> getAllFeedbacks() {
    try {
      List<UserFeedback> feedbacks = feedbackBL.getAllFeedbacks();
      return ResponseEntity.ok(feedbacks);
    } catch (FeedbackNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
