package org.backendmealplan.backendmealplan.controllers;

import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.bl.*;
import org.backendmealplan.backendmealplan.dao.*;
import org.backendmealplan.backendmealplan.enums.MealTime;
import org.backendmealplan.backendmealplan.enums.Unit;
import org.backendmealplan.backendmealplan.exceptions.*;
import org.backendmealplan.backendmealplan.other.DayMealDTO;
import org.backendmealplan.backendmealplan.other.DayNumberDTO;
import org.backendmealplan.backendmealplan.other.IngredientDTO;
import org.backendmealplan.backendmealplan.other.MealDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("admin")
@CrossOrigin
public class AdminController {
    @Autowired
    private IngredientBL ingredientBL;
    @Autowired
    private UserBL userBL;

    @Autowired
    private MealBL mealBL;

    @Autowired
    private PlanBL planBL;

    @Autowired
    private FeedbackBL feedbackBL;
    @Autowired
    private DietTypesDAO dietTypesDAO;

    @Autowired
    private MealsDAO mealsDAO;

    @Autowired
    private DayPlanDAO dayPlanDAO;

    @Autowired
    private PlansDAO plansDAO;

    @Autowired
    private DayPlanIdDAO dayPlanIdDAO;

    @Autowired
    private MealIngredientsDAO mealIngredientsDAO;

    @Autowired
    private DayMealsDAO dayMealsDAO;

    @GetMapping("/getDayNumbers")
    public List<DayNumberDTO> getDayNumbers(@RequestParam String planName) {
        List<DayNumberDTO> returnedList = new ArrayList<>();
        Plan plan = plansDAO.findByPlanName(planName);
        int planLength = Integer.parseInt(plan.getLength());
        List<DayPlan> dayPlanList = dayPlanDAO.getDayNumbers(plan.getPlanId());
        List<Integer> dayNumberList = dayPlanList.stream().mapToInt(DayPlan::getDayNumber).boxed().collect(Collectors.toList());
        for (int i = 1; i <= planLength; i++) {
            if (!dayNumberList.contains(i)) {
                List<String> mealTimes = new ArrayList<>();
                for (MealTime mealTime : MealTime.values()) {
                    mealTimes.add(mealTime.toString());
                }
                returnedList.add(new DayNumberDTO(i, mealTimes));
            }
        }
        for (DayPlan dayPlan : dayPlanList) {
            List<DayMeal> dayMealList = dayMealsDAO.findByIdPlanDayId(dayPlan.getDayPlanKey().getDayPlanId());
            if (dayMealList.size() < 5) {
                List<String> mealTimes = new ArrayList<>();
                List<String> typeList = dayMealList.stream().map(DayMeal::getType).collect(Collectors.toList());
                for (MealTime mealTime : MealTime.values()) {
                    if (!typeList.contains(mealTime.toString()))
                        mealTimes.add(mealTime.toString());
                }
                long count = typeList.stream().filter(str -> str.equals("Snacks")).count();
                if (count == 1)
                    mealTimes.add("Snacks");
                returnedList.add(new DayNumberDTO(dayPlan.getDayNumber(), mealTimes));
            }
        }
        return returnedList;
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userBL.getAll();
            for (User user : users) {
                user.setPassword(null);
            }
            return ResponseEntity.ok(users);
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(@RequestParam Long userId) {
        try {
            userBL.deleteUser(userId);
            return ResponseEntity.ok().build();
        } catch (userNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/reset")
    public ResponseEntity resetUser(@RequestParam Long userId) {
        try {
            userBL.resetUser(userId);
            return ResponseEntity.ok().build();
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateUserPlan(@RequestParam Long userId, @RequestParam String planName) {
        try {
            User user = userBL.updateUserPlan(userId, planName);
            return (ResponseEntity) ResponseEntity.ok(user);
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (PlanNotExistedException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/changeRole")
    public ResponseEntity UpdateUserRole(@RequestParam Long userId, @RequestParam Boolean isAdmin) {
        try {
            userBL.updateUserRole(userId, isAdmin);
            return ResponseEntity.ok().build();
        } catch (UNAUTHORIZEDException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/getFeedbacks")
    public ResponseEntity<List<UserFeedback>> getAllFeedbacks() {
        try {
            List<UserFeedback> feedbacks = feedbackBL.getAllFeedbacks();
            return ResponseEntity.ok(feedbacks);
        } catch (FeedbackNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/getMeals")
    public ResponseEntity<List<Meal>> getAllMeals() {
        try {
            List<Meal> meals = mealBL.getAllMeals();
            return ResponseEntity.ok(meals);
        } catch (MealNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/addMeal")
    public ResponseEntity createMeal(@Valid @RequestBody MealDTO mealDTO) {
        Meal savedMeal = null;
        try {
            Meal meal = new Meal();
            meal.setFat(mealDTO.getFat());
            meal.setFibre(mealDTO.getFibre());
            meal.setProtein(mealDTO.getProtein());
            meal.setCarbs(mealDTO.getCarbs());
            meal.setMealName(mealDTO.getMealName());
            meal.setImageUrl(mealDTO.getImageUrl());
            meal.setPrepareTime(mealDTO.getPrepareTime());
            meal.setCookTime(mealDTO.getCookTime());
            meal.setInstructions(mealDTO.getInstructions());
            meal.setTips(mealDTO.getTips());
            meal.setCalories(mealDTO.getCalories());
            Meal returnedMeal = this.mealBL.addMeal(meal);

            Set<DietType> dietTypeSet = new HashSet<>();
            for (String dietType : mealDTO.getDietTypes()) {
                savedMeal = this.mealsDAO.findByMealName(returnedMeal.getMealName());
                DietType savedDiet = this.dietTypesDAO.findByText(dietType);
                dietTypeSet.add(savedDiet);
            }
            savedMeal.setDietTypes(dietTypeSet);
            this.mealsDAO.save(savedMeal);

            for (IngredientDTO mealIngredient : mealDTO.getIngredients()) {
                Ingredient ingredient = new Ingredient();
                ingredient.setProductName(mealIngredient.getProductName());
                ingredient.setCategory(mealIngredient.getCategory());
                Ingredient returnedIngredient = ingredientBL.addIngredient(ingredient);

                MealIngredients mealIngredients = new MealIngredients();
                mealIngredients.setAmount(mealIngredient.getAmount());
                mealIngredients.setUnit(Unit.valueOf(mealIngredient.getUnit()).name());
                mealIngredients.setId(new MealIngredientId(returnedMeal, returnedIngredient));
                mealBL.addMealIngredients(mealIngredients);

            }
            for (DayMealDTO dayM : mealDTO.getDayMealDTOList()) {
                Plan plan = plansDAO.findByPlanName(dayM.getPlan());
                Optional<DayPlan> dayPlanOptional = dayPlanDAO.getDayNumber(plan.getPlanId(), dayM.getDayNumber());
                if (dayPlanOptional.isEmpty()) {
                    DayPlanId dayPlanId1 = new DayPlanId();
                    DayPlanId dayPlanId = planBL.addDayPlanId(dayPlanId1);
                    DayPlan dayPlan = new DayPlan();
                    dayPlan.setDayPlanKey(new DayPlanKey(plan, dayPlanId));
                    dayPlan.setDayNumber(dayM.getDayNumber());
                    DayPlan dayPlan1 = planBL.addDayPlan(dayPlan);
                    DayMeal dayMeal = new DayMeal();
                    dayMeal.setId(new DayMealKey(returnedMeal, dayPlan1.getDayPlanKey().getDayPlanId()));
                    dayMeal.setType(dayM.getType());
                    mealBL.addDayMeals(dayMeal);
                } else {
                    DayPlanId dayPlanOptionalPlanId = dayPlanOptional.get().getDayPlanKey().getDayPlanId();
                    DayPlanId returnedDayPlanId = dayPlanIdDAO.findByDayPlanId(dayPlanOptionalPlanId.getDayPlanId());
                    DayPlan returnedDayPlan = dayPlanDAO.findByDayPlanKey(new DayPlanKey(plan, returnedDayPlanId));
                    DayMeal dayMeal = new DayMeal();
                    dayMeal.setId(new DayMealKey(returnedMeal, returnedDayPlan.getDayPlanKey().getDayPlanId()));
                    dayMeal.setType(dayM.getType());
                    mealBL.addDayMeals(dayMeal);
                }
            }
            return new ResponseEntity(returnedMeal, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PutMapping("/editMeal")
    public ResponseEntity editMeal(@Valid @RequestBody MealDTO mealDTO) {
        Meal savedMeal = null;
        try {
            Meal meal = mealsDAO.findByMealName(mealDTO.getMealName());
            meal.setMealName(mealDTO.getMealName());
            meal.setFat(mealDTO.getFat());
            meal.setFibre(mealDTO.getFibre());
            meal.setProtein(mealDTO.getProtein());
            meal.setCarbs(mealDTO.getCarbs());
            meal.setMealName(mealDTO.getMealName());
            meal.setImageUrl(mealDTO.getImageUrl());
            meal.setPrepareTime(mealDTO.getPrepareTime());
            meal.setCookTime(mealDTO.getCookTime());
            meal.setInstructions(mealDTO.getInstructions());
            meal.setTips(mealDTO.getTips());
            meal.setCalories(mealDTO.getCalories());
            Meal returnedMeal = mealsDAO.save(meal);

            Set<DietType> dietTypeSet = new HashSet<>();
            for (String dietType : mealDTO.getDietTypes()) {
                savedMeal = mealsDAO.findByMealName(returnedMeal.getMealName());
                DietType savedDiet = dietTypesDAO.findByText(dietType);
                dietTypeSet.add(savedDiet);
            }
            savedMeal.setDietTypes(dietTypeSet);
            savedMeal = mealsDAO.save(savedMeal);

            mealIngredientsDAO.deleteByMealId(savedMeal.getMealId());

            for (IngredientDTO mealIngredient : mealDTO.getIngredients()) {
                Ingredient ingredient = new Ingredient();
                ingredient.setProductName(mealIngredient.getProductName());
                ingredient.setCategory(mealIngredient.getCategory());
                Ingredient returnedIngredient = ingredientBL.addIngredient(ingredient);

                MealIngredients mealIngredients = new MealIngredients();
                mealIngredients.setAmount(mealIngredient.getAmount());
                mealIngredients.setUnit(Unit.valueOf(mealIngredient.getUnit()).name());
                mealIngredients.setId(new MealIngredientId(returnedMeal, returnedIngredient));
                mealBL.addMealIngredients(mealIngredients);

            }
            return new ResponseEntity(returnedMeal, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
