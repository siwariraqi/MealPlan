package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.exceptions.MealNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.paymentNotFoundException;
import org.backendmealplan.backendmealplan.exceptions.userNotFoundException;
import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.time.temporal.ChronoUnit;

import org.backendmealplan.backendmealplan.beans.Meal;


@Service
public class MealBL {

    @Autowired
    DietTypesDAO dietTypesDAO;

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
            List<DayMeal> dayMeals;
            if (dayNumber != 0) {
                DayPlanId dayPlanId = dayPlanIds.get(dayNumber - 1);
                dayMeals = dayMealsDAO.getMealsOfDay(dayPlanId.getDayPlanId());

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
                    dayMeals = dayMealsDAO.getMealsOfDay(dayPlanId.getDayPlanId());
                } else {
                    throw new paymentNotFoundException("Payment not found");
                }

            }
            Collections.sort(dayMeals,new Comparator<DayMeal>() {
                @Override
                public int compare(DayMeal o1, DayMeal o2) {
                    String[] order = {"Breakfast", "Snacks","Snacks", "Lunch","Dinner"};
                    List<String> ord = new ArrayList<>();
                    for(String type:order){
                        ord.add(type);
                    }
                    return ord.indexOf(o1.getType()) - ord.indexOf(o2.getType());
                }
            });
            if(dayMeals.size() == 5){
                DayMeal snack = dayMeals.get(2);
                dayMeals.remove(2);
                dayMeals.add(3,snack);
            }
            return dayMeals;
        } else {
            throw new userNotFoundException("User not found");
        }
    }

  public List<MealIngredients> getDayPlanMealIngredients(Long mealId) throws MealNotFoundException {
    return mealIngredientsDAO.getMealIngredients(mealId);
  }

    public List<String> getTotalDayNutrition(Integer dayNumber, Long userID) throws userNotFoundException, paymentNotFoundException {
        List<DayMeal> dayMeals = getDayPlanMeals(dayNumber, userID);
        List<String> TotalNutrition = new ArrayList<>();
        Double totalCalories = 0.0;
        Double totalFat = 0.0;
        Double totalProtien = 0.0;
        Double totalCarbs = 0.0;
        Double totalFibre = 0.0;

        for (DayMeal meal : dayMeals) {

            totalFat += meal.getId().getMeal().getFat();
            totalProtien += meal.getId().getMeal().getProtein();
            totalCarbs += meal.getId().getMeal().getCarbs();
            totalFibre += meal.getId().getMeal().getFibre();
            totalCalories += meal.getId().getMeal().getCalories();
        }
        TotalNutrition.add("totalCalories:" + totalCalories);
        TotalNutrition.add("totalFat:" + totalFat);
        TotalNutrition.add("totalProtien:" + totalProtien);
        TotalNutrition.add("totalCarbs:" + totalCarbs);
        TotalNutrition.add("totalFibre:" + totalFibre);

        return TotalNutrition;

    }


    public Meal addMeal(Meal meal) throws Exception {
        //check if meal exists
        Meal returnedMeal = this.mealsDAO.findByMealName(meal.getMealName());
        if (returnedMeal==null) {
            return this.mealsDAO.save(meal);
        }
        throw new Exception("Meal with name "+ meal.getMealName() +" found");
    }

    public void addMealIngredients(MealIngredients mealIngredients) {
        this.mealIngredientsDAO.save(mealIngredients);
    }

    public void addDayMeals(DayMeal dayMeal) {
        this.dayMealsDAO.save(dayMeal);
    }

    public List<DayMeal> getMealsByTime(String mealTime, Long userId) throws userNotFoundException {
        List<DayMeal> returnedList = new ArrayList<>();
        Set<String> mealNamesSet = new HashSet<>();
        Optional<User> users = this.usersDAO.findById(userId);
        if (users.isPresent()) {
            User user = users.get();
            Plan plan = user.getPlan();
            List<DayPlanId> dayPlanIds = plan.getDayPlanIdList();
            for (DayPlanId dayPlanId : dayPlanIds) {
                List<DayMeal> dayMealList = this.dayMealsDAO.findByIdPlanDayIdAndType(dayPlanId, mealTime);
                for (DayMeal dayMeal : dayMealList) {
                    if (!mealNamesSet.contains(dayMeal.getId().getMeal().getMealName())) {
                        returnedList.add(dayMeal);
                        mealNamesSet.add(dayMeal.getId().getMeal().getMealName());
                    }
                }
            }
            return returnedList;
        } else throw new userNotFoundException("User not found");
    }

    public void addDietType(DietType dietType) {
        //check if dietType exists
        DietType dietTypes = this.dietTypesDAO.findByText(dietType.getText());
        if (dietTypes==null) {
            this.dietTypesDAO.save(dietType);
        }
    }
}


