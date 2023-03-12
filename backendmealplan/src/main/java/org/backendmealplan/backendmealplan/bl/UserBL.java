package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.Exceptions.userNotFoundException;
import org.backendmealplan.backendmealplan.beans.DayPlanId;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.Plan;
import org.backendmealplan.backendmealplan.beans.User;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserBL {

  @Autowired
  MealsDAO mealsDAO;

  @Autowired
  UsersDAO usersDAO;
  public List <Meal> getDayPlanMeals(Integer dayNumber,Long userID) throws userNotFoundException {

        Optional<User> users= this.usersDAO.findById(userID);
    if(users.isPresent()) {
      User user = users.get();
      Plan plan = user.getPlan();
      List<DayPlanId> dayPlanIds = plan.getDayPlanIdList();
      if(dayNumber!=0 ){
        DayPlanId dayPlanId = dayPlanIds.get(dayNumber - 1);
        return dayPlanId.getMeals();
      }
      else {
        LocalDate currentDate = LocalDate.now();
        int dayOfMonth = currentDate.getDayOfMonth();

        //=dayNumber= palnDatePurnched-cuurentDate
        //  DayPlanId dayPlanId = dayPlanIds.get(dayNumber - 1);
        //        return dayPlanId.getMeals();
      }

    }
    else {
      throw new userNotFoundException();
    }
  }
}
