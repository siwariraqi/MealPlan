package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.backendmealplan.backendmealplan.dao.UserFeedbacksDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackBL {

  @Autowired
  private MealsDAO mealsDAO;

  @Autowired
  private UsersDAO usersDAO;

  @Autowired
  private UserFeedbacksDAO userFeedbacksDAO;

  public void saveFeedback(UserFeedback userFeedback){
    userFeedbacksDAO.save(userFeedback);
  }
}
