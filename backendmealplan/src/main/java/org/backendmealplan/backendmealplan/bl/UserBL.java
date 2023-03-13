package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.Exceptions.PaymentNotFoundException;
import org.backendmealplan.backendmealplan.Exceptions.UserNotFoundException;
import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.backendmealplan.backendmealplan.dao.PaymentDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.time.temporal.ChronoUnit;

@Service
public class UserBL {

  @Autowired
  private MealsDAO mealsDAO;

  @Autowired
  private UsersDAO usersDAO;

  @Autowired
  private PaymentDAO paymentDAO;
  public List <Meal> getDayPlanMeals(Integer dayNumber,Long userID) throws UserNotFoundException, PaymentNotFoundException {

    Optional<User> users= this.usersDAO.findById(userID);
    if(users.isPresent()) {
      User user = users.get();
      Plan plan = user.getPlan();
      List<DayPlanId> dayPlanIds = plan.getDayPlanIdList();
      if(dayNumber!=0 ){
        DayPlanId dayPlanId = dayPlanIds.get(dayNumber);
        return dayPlanId.getMeals();
      }
      else {
        Optional<Payment> payment = paymentDAO.findByUserUserId(userID);
        if (payment.isPresent()) {
          Date paymentOfDate = payment.get().getPaymentOfDate();
          LocalDate currentDate = LocalDate.now();
          long daysBetween = ChronoUnit.DAYS.between(paymentOfDate.toInstant(), currentDate);
          dayNumber = (int) daysBetween;
          DayPlanId dayPlanId = dayPlanIds.get(dayNumber);
          return dayPlanId.getMeals();
        } else {
          throw new PaymentNotFoundException("Payment not found");

        }
      }
    }
    else {
      throw new UserNotFoundException("User not found");
    }
  }
}
