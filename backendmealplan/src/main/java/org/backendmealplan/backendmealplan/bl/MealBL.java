package org.backendmealplan.backendmealplan.bl;
import org.backendmealplan.backendmealplan.exceptions.paymentNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.time.temporal.ChronoUnit;
import org.backendmealplan.backendmealplan.beans.Meal;


@Service
public class MealBL {


  @Autowired
  private UsersDAO usersDAO;

  @Autowired
  private PaymentDAO paymentDAO;
  @Autowired
  MealsDAO mealsDAO;
  @Autowired
  MealIngredientsDAO mealIngredientsDAO;

  @Autowired
  DayMealsDAO dayMealsDAO;

  public List<DayMeal> getDayPlanMeals(Integer dayNumber, Long userID) throws userNotFoundException, paymentNotFoundException {
    Optional<User> users = this.usersDAO.findById(userID);
    if (users.isPresent()) {
      User user = users.get();
      Plan plan = user.getPlan();
      List<DayPlanId> dayPlanIds = plan.getDayPlanIdList();
      if (dayNumber != 0) {
        DayPlanId dayPlanId = dayPlanIds.get(dayNumber - 1);
        List<DayMeal> dayMeals = dayMealsDAO.getMealsOfDay(dayPlanId.getDayPlanId());
        return dayMeals;
      } else {
        Optional<Payment> payment = paymentDAO.findByUserUserId(userID);
        if (payment.isPresent()) {
          Date paymentOfDate = payment.get().getPaymentOfDate();
          LocalDate paymentOfLocalDate = paymentOfDate.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();
          LocalDate currentDate = LocalDate.now();
          long daysBetween = ChronoUnit.DAYS.between(paymentOfLocalDate, currentDate);
          dayNumber = (int) daysBetween;
          DayPlanId dayPlanId = dayPlanIds.get(dayNumber - 1);
          List<DayMeal> dayMeals = dayMealsDAO.getMealsOfDay(dayPlanId.getDayPlanId());
          return dayMeals;
        } else {
          throw new paymentNotFoundException("Payment not found");
        }
      }
    } else {
      throw new userNotFoundException("User not found");
    }
  }



  public List<String> getTotalDayNutrition (Integer dayNumber,Long userID) throws userNotFoundException,paymentNotFoundException{
    List <DayMeal> dayMeals=getDayPlanMeals(dayNumber,userID);
    List<String> TotalNutrition =new ArrayList<>();
    Double totalCalories=0.0;
    Double totalFat=0.0;
    Double totalProtien=0.0;
    Double totalCarbs=0.0;
    Double totalFibre=0.0;

    for( DayMeal meal:dayMeals){

      totalFat +=meal.getId().getMeal().getFat();
      totalProtien += meal.getId().getMeal().getProtein();
      totalCarbs +=meal.getId().getMeal().getCarbs();
      totalFibre +=meal.getId().getMeal().getFiber();
      totalCalories+= meal.getId().getMeal().getCalories();
    }
    TotalNutrition.add("totalCalories:"+totalCalories);
    TotalNutrition.add("totalFat:"+totalFat);
    TotalNutrition.add("totalProtien:"+totalProtien);
    TotalNutrition.add("totalCarbs:"+totalCarbs);
    TotalNutrition.add("totalFibre:"+totalFibre);

    return TotalNutrition;

  }


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


