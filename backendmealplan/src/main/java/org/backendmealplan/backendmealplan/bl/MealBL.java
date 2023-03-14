package org.backendmealplan.backendmealplan.bl;
<<<<<<< HEAD
import org.backendmealplan.backendmealplan.Exceptions.PaymentNotFoundException;
import org.backendmealplan.backendmealplan.Exceptions.UserNotFoundException;
import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.backendmealplan.backendmealplan.dao.PaymentDAO;
import org.backendmealplan.backendmealplan.dao.UsersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.time.temporal.ChronoUnit;
=======

import org.backendmealplan.backendmealplan.beans.DayMeal;
import org.backendmealplan.backendmealplan.beans.Ingredient;
import org.backendmealplan.backendmealplan.beans.Meal;
import org.backendmealplan.backendmealplan.beans.MealIngredients;
import org.backendmealplan.backendmealplan.dao.DayMealsDAO;
import org.backendmealplan.backendmealplan.dao.MealIngredientsDAO;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
>>>>>>> dev-branch

@Service
public class MealBL {

<<<<<<< HEAD
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


  public List<Double> getTotalDayNutrition (Integer dayNumber,Long userID) throws UserNotFoundException,PaymentNotFoundException{
    List <Meal> dayMeals=getDayPlanMeals(dayNumber,userID);
    List<Double> TotalNutrition =new ArrayList<>();
    Double totalCalories=0.0;
    Double totalFat=0.0;
    Double totalProtien=0.0;
    Double totalCarbs=0.0;
    Double totalFibre=0.0;

    for( Meal meal:dayMeals){
      totalFat +=meal.getFat();
      totalProtien += meal.getProtein();
      totalCarbs +=meal.getCarbs();
      totalFibre +=meal.getFiber();
    }
    totalCalories= totalCarbs+totalFat+totalProtien+totalCarbs+totalFibre;
    TotalNutrition.add(totalCalories);
    TotalNutrition.add(totalFat);
    TotalNutrition.add(totalProtien);
    TotalNutrition.add(totalCarbs);
    TotalNutrition.add(totalFibre);

    return TotalNutrition;

  }
}

=======
    @Autowired
    MealsDAO mealsDAO;
    @Autowired
    MealIngredientsDAO mealIngredientsDAO;

    @Autowired
    DayMealsDAO dayMealsDAO;

    public Meal addMeal(Meal meal) {
        //check if meal exists
        List<Meal> meals = this.mealsDAO.findByMealName(meal.getMealName());
        if (meals.isEmpty()) {
            this.mealsDAO.save(meal);
        }
        return meal;
    }

    public void addMealIngredients(MealIngredients mealIngredients) {
            this.mealIngredientsDAO.save(mealIngredients);
    }

    public void addDayMeals(DayMeal dayMeal){
        this.dayMealsDAO.save(dayMeal);
    }
}
>>>>>>> dev-branch
