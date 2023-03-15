package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.beans.UserFeedback;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.backendmealplan.backendmealplan.dao.UserFeedbacksDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.backendmealplan.backendmealplan.exceptions.MealNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
  public Integer saveFeedback(UserFeedback userFeedback , Long userId,Long mealId) throws userNotFoundException, MealNotFoundException {
    List<UserFeedback> userFeedbacks=userFeedbacksDAO.findByUserUserIdAndMealMealId(userId,mealId);
    if(userFeedbacks.isEmpty()){
      Optional<User> optionalUser = this.usersDAO.findById(userId);
      if (optionalUser.isPresent()) {
        User user = optionalUser.get();
        Optional<Meal> optionalMeal = this.mealsDAO.findById(mealId);
        if (optionalMeal.isPresent()) {
          Meal meal = optionalMeal.get();
          userFeedback.setUser(user);
          userFeedback.setMeal(meal);
          userFeedbacksDAO.save(userFeedback);
//          user.getFeedbacks().add(userFeedback);
//          meal.getFeedbacks().add(userFeedback);
          return 1;
        }else{
          throw new MealNotFoundException("Meal not found");
        }

      }else{
        throw new userNotFoundException("User not found");
      }
    }
    else {
      UserFeedback userFeedbackDB=userFeedbacks.get(0);
      if(userFeedback.getFeedbackText()!=null){
        userFeedbackDB.setFeedbackText(userFeedback.getFeedbackText());
      }
      if(userFeedback.getRating()!=-1){
        userFeedbackDB.setRating(userFeedback.getRating());
      }
      if(userFeedback.isOnIt()==true){
        userFeedbackDB.setOnIt(userFeedback.isOnIt());
      }
      userFeedbackDB.setDate(userFeedback.getDate());
      userFeedbacksDAO.save(userFeedbackDB);
      return 1;
    }
  }
}
