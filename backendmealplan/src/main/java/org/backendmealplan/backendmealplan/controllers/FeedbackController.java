package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.backendmealplan.backendmealplan.bl.FeedbackBL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("feedback")
@CrossOrigin
public class FeedbackController {

  @Autowired
  private FeedbackBL feedbackBL;
  @PutMapping(name = "save")
  public void saveFeedback (@RequestHeader UserFeedback userFeedback){
    feedbackBL.saveFeedback(userFeedback);
  }
}
