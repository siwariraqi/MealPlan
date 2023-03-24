package org.backendmealplan.backendmealplan.bl;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.backendmealplan.backendmealplan.dao.UserFeedbacksDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.backendmealplan.backendmealplan.exceptions.MealNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.RatingNotInRangeException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackBL {

  @Autowired
  private MealsDAO mealsDAO;

  @Autowired
  private UsersDAO usersDAO;

  @Autowired
  private UserFeedbacksDAO userFeedbacksDAO;

  @Transactional
  public Integer saveFeedback(UserFeedback userFeedback , Long userId,Long mealId) throws userNotFoundException, MealNotFoundException, RatingNotInRangeException {
    Optional<User> optionalUser = this.usersDAO.findById(userId);
    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      Optional<Meal> optionalMeal = this.mealsDAO.findById(mealId);
      if (optionalMeal.isPresent()) {
        Meal meal = optionalMeal.get();
        List<UserFeedback> userFeedbacks=userFeedbacksDAO.findByUserAndMeal(user,meal);
        if(userFeedbacks.isEmpty()) {
          userFeedback.setUser(user);
          userFeedback.setMeal(meal);
          userFeedback.setDate(new Date());
          if(userFeedback.getIsOnIt() == null) {
            userFeedback.setIsOnIt(false);
          }
          if(userFeedback.getFeedbackText() == null) {
            userFeedback.setFeedbackText("");
          }
          userFeedbacksDAO.save(userFeedback);
          user.getFeedbacks().add(userFeedback);
          meal.getFeedbacks().add(userFeedback);
        }
        else {
          UserFeedback userFeedbackDB=userFeedbacks.get(0);
          if(userFeedback.getFeedbackText()!=null){
            userFeedbackDB.setFeedbackText(userFeedback.getFeedbackText());
          }
          if(userFeedback.getRating()!=-1){
            if(userFeedback.getRating() < 5 && userFeedback.getRating() > -1) {
              userFeedbackDB.setRating(userFeedback.getRating());
            }
            else{
              throw new RatingNotInRangeException();
            }
          }
          if(userFeedback.getIsOnIt() != null) {
            userFeedbackDB.setIsOnIt(userFeedback.getIsOnIt());
          }
          userFeedbackDB.setDate(new Date());
          userFeedbacksDAO.save(userFeedbackDB);
        }
        return 1;
      }else{
        throw new MealNotFoundException("Meal not found");
      }

    }else{
      throw new userNotFoundException("User not found");
    }

  }

  @Transactional
  public void deleteFeedbacksByUser(User user) {
    userFeedbacksDAO.deleteByUser(user);
  }

}
