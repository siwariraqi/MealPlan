package org.backendmealplan.backendmealplan.bl;

import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.enums.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InitDataBL {
//    @Autowired
////    UserBL userBL;

    @Autowired
    PlanBL planBL;

    @Autowired
    GoalBL goalBL;

    @Autowired
    RecipeBL recipeBL;

    @Autowired
    MealBL mealBL;

    @Autowired
    IngredientBL ingredientBL;

    Ingredient[] ingredients = new Ingredient[49];
    Meal[] meals = new Meal[8];
    Plan freemuimPlan,basicPlan,premiumPlan;

    DayPlanId[] dayPlanIds = new DayPlanId[28];


    public void run() {
        createGoals();
        createIngredients();
        createMeals();
        createMealIngredients();
        createPlans();
        createDays();
        createDayMeals();
        createDayPlan();
    }

    private void createDays() {
        for (int i = 0; i < dayPlanIds.length; i++) {
            DayPlanId dayPlanId = insertDays();
            dayPlanIds[i] = dayPlanId;
        }
    }
    private DayPlanId insertDays(){
        DayPlanId dayPlanId1 = new DayPlanId();
        return  planBL.addDayPlanId(dayPlanId1);
    }

    private void createPlans() {
        freemuimPlan = insertPlan(PlanType.Freemium.name(), "0",0,"","");
        basicPlan = insertPlan(PlanType.Basic.name(), "14",29,
                "14 Breakfasts&14 Lunches&14 Dinners&14 Snacks",
                "Build healthier habits$Introduce new recipes into you rotation&" +
                        "Eat AND enjoy the foods you're preparing&Work towards a lifestyle shift");
        premiumPlan = insertPlan(PlanType.Premium.name(), "28",34,
                "28 Breakfasts&28 Lunches&28 Dinners&28 Snacks",
                "Become a pro at managing your health&Build habits that actually stick&" +
                        "Prepare foods you'll never get sick of&Bulk up your recipe rotation with over 30 delicious and healthy recipes");
    }
    private Plan insertPlan(String planName, String length,double price,String includes,String benefits) {
        Plan plan = new Plan();
        plan.setPlanName(planName);
        plan.setPrice(price);
        plan.setLength(length);
        plan.setIncludes(includes);
        plan.setBenefits(benefits);
        return planBL.addPlan(plan);
    }

    private void createIngredients() {

        //breakfast1
        ingredients[0] = insertIngredient("unsweetened almond milk", FoodCategories.Dairy.name());
        ingredients[1] = insertIngredient("peanut butter", FoodCategories.Dairy.name());
        ingredients[2] = insertIngredient("chia seeds", FoodCategories.Others.name());
        ingredients[3] = insertIngredient("bananas – sliced", FoodCategories.Fruit.name());

        //breakfast2
        ingredients[19] = insertIngredient("grated carrot", FoodCategories.Vegetables.name());
        ingredients[20] = insertIngredient("a big pinch of mixed spice", FoodCategories.Others.name());
        ingredients[21] = insertIngredient("cinnamon", FoodCategories.Others.name());
        ingredients[22] = insertIngredient("rolled porridge oats", FoodCategories.Others.name());
        ingredients[23] = insertIngredient("honey", FoodCategories.Others.name());
        ingredients[24] = insertIngredient("sultanas", FoodCategories.Others.name());
        ingredients[25] = insertIngredient("Greek yogurt", FoodCategories.Dairy.name());

        //breakfast3
        ingredients[36] = insertIngredient("porridge oats", FoodCategories.Others.name());
        ingredients[37] = insertIngredient("milled seeds with flax and chia", FoodCategories.Others.name());
        ingredients[38] = insertIngredient("milk", FoodCategories.Dairy.name());
        ingredients[39] = insertIngredient("coconut yogurt", FoodCategories.Dairy.name());
        ingredients[40] = insertIngredient("toasted flaked almonds", FoodCategories.Others.name());
        ingredients[41] = insertIngredient("Mixed berries", FoodCategories.Fruit.name());

        //lunch1
        ingredients[4] = insertIngredient("smoked salmon", FoodCategories.Meat.name());
        ingredients[5] = insertIngredient("Philadelphia cream cheese", FoodCategories.Dairy.name());
        ingredients[6] = insertIngredient("capers", FoodCategories.Fruit.name());
        ingredients[7] = insertIngredient("spring onions", FoodCategories.Vegetables.name());
        ingredients[8] = insertIngredient("cucumbers", FoodCategories.Vegetables.name());
        ingredients[9] = insertIngredient("multi-grain bread", FoodCategories.Others.name());
        ingredients[10] = insertIngredient("lettuce", FoodCategories.Vegetables.name());
        //lunch2
        ingredients[26] = insertIngredient("Chicken Breast, Cooked (shredded or chopped)", FoodCategories.Meat.name());
        ingredients[27] = insertIngredient("Cream Cheese, Regular (divided)", FoodCategories.Dairy.name());
        ingredients[28] = insertIngredient("Whole Wheat Tortilla", FoodCategories.Others.name());
        ingredients[29] = insertIngredient("Arugula", FoodCategories.Others.name());
        ingredients[30] = insertIngredient("stalks Celery (chopped)", FoodCategories.Others.name());

        //lunch3
        ingredients[42] = insertIngredient("olive oil", FoodCategories.Others.name());
        ingredients[43] = insertIngredient("red onion, chopped", FoodCategories.Vegetables.name());
        ingredients[44] = insertIngredient("garlic cloves, chopped", FoodCategories.Vegetables.name());
        ingredients[45] = insertIngredient("large carrots", FoodCategories.Vegetables.name());
        ingredients[46] = insertIngredient("large parsnip", FoodCategories.Vegetables.name());
        ingredients[47] = insertIngredient("low sodium vegetable stock cube", FoodCategories.Vegetables.name());
        ingredients[48] = insertIngredient("milk", FoodCategories.Dairy.name());

        //dinner1
        ingredients[11] = insertIngredient("Sweet Potato", FoodCategories.Vegetables.name());
        ingredients[12] = insertIngredient("Broccoli", FoodCategories.Vegetables.name());
        ingredients[13] = insertIngredient("Extra Virgin Olive Oil", FoodCategories.Vegetables.name());
        ingredients[14] = insertIngredient("Sea Salt", FoodCategories.Vegetables.name());
        ingredients[15] = insertIngredient("Lemon Juice", FoodCategories.Vegetables.name());
        ingredients[16] = insertIngredient("Garlic(clove, minced)", FoodCategories.Vegetables.name());
        ingredients[17] = insertIngredient("Parsley (finely chopped)", FoodCategories.Vegetables.name());
        ingredients[18] = insertIngredient("Salmon Fillet", FoodCategories.Meat.name());


        //dinner3
        ingredients[31] = insertIngredient("wild or brown Rice (dry, uncooked)", FoodCategories.Others.name());
        ingredients[32] = insertIngredient("chicken breast (cubed)", FoodCategories.Meat.name());
        ingredients[33] = insertIngredient("Sea Salt & Black Pepper (to taste)", FoodCategories.Others.name());
        ingredients[34] = insertIngredient("large Eggs (whisked)", FoodCategories.Others.name());
        ingredients[35] = insertIngredient("Frozen Vegetable Mix", FoodCategories.Vegetables.name());

    }

    private Ingredient insertIngredient(String ingredientName, String categoryOfFood) {
        Ingredient ingredient = new Ingredient();
        ingredient.setProductName(ingredientName);
        ingredient.setCategory(categoryOfFood);
        return ingredientBL.addIngredient(ingredient);
    }


    private void createGoals() {
        Goal goal;
        for (GoalType goalType : GoalType.values()) {
            goal = new Goal();
            goal.setText(goalType.getValue());
            goalBL.addGoal(goal);
        }
    }


    private void createMeals() {
        meals[0] = insertMeal("Peanut butter and banana chia pudding",
                300, 15, 10, 9, 25,
                "",
                "Add the milk, peanut butter, to a jar and shake well until the peanut butter has been incorporated" +
                        "with the milk. Add the chia seeds and shake again to combine. The next morning, stir the muesli" +
                        "well. If it’s too thick, add a little more water until it reaches your preferred consistency." + "$" +
                        "Refrigerate for at least three hours or until chilled." + "$" +
                        "To serve, divide the chia pudding between bowls and top with the sliced banana.",
                "10 minutes", "3 hours", "Want more flavour : Add cinnamon, sea salt, and/or vanilla extract." + "$" + "Want additional toppings : Berries, honey, or extra peanut butter");

        meals[1] = insertMeal("Carrot cake overnight oats",
                319, 9, 9, 6, 29,
                "",
                "Mix the grated carrot, mixed spice, cinnamon, and oats" + "$" +
                        "Add 2⁄3 cup (X4) water and a pinch of salt" + "$" +
                        "Place in 4 serving jars and cover" + "$" +
                        "Place in fridge overnight" + "$" +
                        "Add honey and sultanas and Greek yogurt in the morning",
                "5 minutes", "Overnight", "");

        meals[2] = insertMeal("Oat and Chia porridge",
                370, 19, 11, 8, 34,
                "",
                "Soak the oats and chia seeds in 800ml water overnight" + "$" +
                        "Add the oats and seeds to a pan the next morning with milk" + "$" +
                        "Place in 4 bowls and serve with yogurt and fruit" + "$",
                "5 minutes", "Overnight", "");

        meals[3] = insertMeal("Smoked salmon sandwich",
                667, 6.6, 5.6, 2, 10.5,
                "",
                "Cut the slices of salmon into small pieces." + "$" +
                        "In a small mixing bowl combine salmon with cream cheese, chopped capers, finely diced spring\n" +
                        "onion and diced cucumber, mix well." + "$" +
                        "Place mixture onto half the slices of bread, top with lettuce and remaining bread slices." + "$",
                "10 minutes", "", "");

        meals[4] = insertMeal("Chicken and cream cheese wrap",
                151, 3.5, 3.4, 7, 23,
                "",
                "In a small bowl, mix together the chicken and half the cream cheese." + "$" +
                        "Lay the tortilla flat and spread the remaining cream cheese, then add the arugula, chicken, and celery. Roll the tortilla tightly and enjoy!",
                "5 minutes", "Overnight", "");

        meals[5] = insertMeal("Carrot and parsnip soup",
                400, 12, 12, 4, 33,
                "",
                "Heat the oil in a saucepan and fry the onion until softened" + "$" +
                        "Add the garlic and cook for 2mins" + "$" +
                        "Add the carrots, parsnip, and stock to the saucepan" + "$" +
                        "Bring to boil and then reduce and simmer for 20mins" + "$" +
                        "Add the milk" + "$" + "Blend until smooth",
                "10 minutes", "20 minutes", "");

        meals[6] = insertMeal("Lemon garlic salmon, broccoli and sweet potatoes",
                450, 20, 40, 6, 30,
                "",
                "Preheat the oven to 375oF and line a baking sheet with parchment paper." + "$" +
                        "Add the sweet potato and broccoli to the pan and drizzle with 2⁄3 of the oil and season with half of\n" +
                        "the salt. Stir to evenly coat the vegetables and bake for 10 minutes." + "$" +
                        "Meanwhile, in a small bowl combine the remaining oil, lemon juice, garlic, and parsley." + "$" +
                        "Remove the pan from the oven. Stir the vegetables and make room for the salmon in the centre of\n" +
                        "the pan." + "$" +
                        "Place the salmon on the pan and season with the remaining salt. Spoon the lemon garlic sauce over\n" +
                        "top of the fillets. Continue to bake for 15 minutes or until the salmon is cooked through and the\n" +
                        "vegetables are tender. Divide between plates and enjoy!",
                "10 minutes", "15 minutes", "Optional : Add cauliflower, Brussels sprouts, cabbage, zucchini, or bell pepper");

        meals[7] = insertMeal("Chicken fried rice",
                450, 15, 30, 5, 40,
                "",
                "Cook the rice according to the package instructions and set aside." + "$" +
                        "Heat a large non-stick pan over medium-high heat. Add the cubed chicken and season with salt and\n" +
                        "pepper. Cook to your desired doneness, then transfer to a bowl." + "$" +
                        "Add the eggs to the same pan and stir to scramble as it cooks, about two to three minutes." + "$" +
                        "Push the eggs to the side of the pan, and add the frozen vegetables. Season with salt and pepper and\n" +
                        "cook until warmed through, about three minutes." + "$" +
                        "Add the rice and cooked chicken. Stir until well combined and season with additional salt and pepper\n" +
                        "if needed. Divide into bowls and enjoy!",
                "10 minutes", "15 minutes", "");
    }

    private Meal insertMeal(String MealName, int calories, double fat, double protein, double fibre, double carbs, String imageUrl, String instructions, String prepareTime, String cookTime, String tips) {
        Meal meal = new Meal();
        meal.setMealName(MealName);
        meal.setCalories(calories);
        meal.setCarbs(carbs);
        meal.setFiber(fibre);
        meal.setProtein(protein);
        meal.setFat(fat);
        meal.setImageUrl(imageUrl);
        meal.setInstructions(instructions);
        meal.setPrepareTime(prepareTime);
        meal.setCookTime(cookTime);
        meal.setTips(tips);
        return mealBL.addMeal(meal);
    }

    private void createMealIngredients() {
        //breakfast1
        insertMealIngredients( meals[0], ingredients[0], Optional.of(4.0), Optional.of(Unit.cup.name()));
        insertMealIngredients( meals[0], ingredients[1], Optional.of(4.5), Optional.of(Unit.oz.name()));
        insertMealIngredients( meals[0], ingredients[2], Optional.of(4.25), Optional.of(Unit.cup.name()));
        insertMealIngredients( meals[0], ingredients[3], Optional.of(4.0), Optional.empty());
        //breakfast2
        insertMealIngredients(meals[1], ingredients[19], Optional.of(5.6), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[1], ingredients[20], Optional.empty(), Optional.empty());
        insertMealIngredients(meals[1], ingredients[21], Optional.of(0.25), Optional.of(Unit.teaspoon.name()));
        insertMealIngredients(meals[1], ingredients[22], Optional.of(7.0), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[1], ingredients[23], Optional.of(1.0), Optional.of(Unit.teaspoon.name()));
        insertMealIngredients(meals[1], ingredients[24], Optional.of(1.0), Optional.of(Unit.teaspoon.name()));
        insertMealIngredients(meals[1], ingredients[25], Optional.of(1.0), Optional.of(Unit.tablespoon.name()));
        //breakfast3
        insertMealIngredients(meals[2], ingredients[36], Optional.of(5.3), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[2], ingredients[37], Optional.of(1.8), Optional.empty());
        insertMealIngredients(meals[2], ingredients[38], Optional.of(1.6667), Optional.of(Unit.cup.name()));
        insertMealIngredients(meals[2], ingredients[39], Optional.of(7.0), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[2], ingredients[40], Optional.of(1.4), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[2], ingredients[41], Optional.empty(), Optional.empty());
        //lunch1
        insertMealIngredients(meals[3], ingredients[4], Optional.of(7.0), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[3], ingredients[5], Optional.of(4.0), Optional.of(Unit.tablespoon.name()));
        insertMealIngredients(meals[3], ingredients[6], Optional.of(20.0), Optional.empty());
        insertMealIngredients(meals[3], ingredients[7], Optional.of(4.0), Optional.of(Unit.tablespoon.name()));
        insertMealIngredients(meals[3], ingredients[8], Optional.of(0.5), Optional.of(Unit.cup.name()));
        insertMealIngredients(meals[3], ingredients[9], Optional.of(8.0), Optional.of(Unit.slice.name()));
        insertMealIngredients(meals[3], ingredients[10], Optional.of(2.0), Optional.of(Unit.cup.name()));

        //lunch2
        insertMealIngredients(meals[4], ingredients[26], Optional.of(12.0), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[4], ingredients[27], Optional.of(4.2), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[4], ingredients[28], Optional.of(4.0), Optional.empty());
        insertMealIngredients(meals[4], ingredients[29], Optional.of(2.5), Optional.of(Unit.cup.name()));
        insertMealIngredients(meals[4], ingredients[30], Optional.of(4.0), Optional.empty());

        //lunch3
        insertMealIngredients(meals[5], ingredients[42], Optional.of(1.0), Optional.of(Unit.tablespoon.name()));
        insertMealIngredients(meals[5], ingredients[43], Optional.of(1.0), Optional.empty());
        insertMealIngredients(meals[5], ingredients[44], Optional.of(2.0), Optional.empty());
        insertMealIngredients(meals[5], ingredients[45], Optional.of(3.0), Optional.empty());
        insertMealIngredients(meals[5], ingredients[46], Optional.of(2.0), Optional.empty());
        insertMealIngredients(meals[5], ingredients[47], Optional.of(1.0), Optional.empty());
//        insertMealIngredients(meals[5], ingredients[48], Optional.of(0.5), Optional.of(Unit.cup.name()));

        //dinner1
        insertMealIngredients(meals[6], ingredients[11], Optional.of(4.0), Optional.empty());
        insertMealIngredients(meals[6], ingredients[12], Optional.of(5.0), Optional.of(Unit.cup.name()));
        insertMealIngredients(meals[6], ingredients[13], Optional.of(3.0), Optional.of(Unit.tablespoon.name()));
        insertMealIngredients(meals[6], ingredients[14], Optional.empty(), Optional.empty());
        insertMealIngredients(meals[6], ingredients[15], Optional.of(2.0), Optional.of(Unit.tablespoon.name()));
        insertMealIngredients(meals[6], ingredients[16], Optional.of(2.0), Optional.empty());
        insertMealIngredients(meals[6], ingredients[17], Optional.of(2.0), Optional.of(Unit.tablespoon.name()));
        insertMealIngredients(meals[6], ingredients[18], Optional.of(24.0), Optional.of(Unit.oz.name()));

        //dinner2
        insertMealIngredients(meals[7],  ingredients[31], Optional.of(0.667), Optional.of(Unit.cup.name()));
        insertMealIngredients(meals[7],  ingredients[32], Optional.of(16.0), Optional.of(Unit.oz.name()));
        insertMealIngredients(meals[7],  ingredients[33], Optional.empty(), Optional.empty());
        insertMealIngredients(meals[7],  ingredients[34], Optional.of(3.0), Optional.empty());
        insertMealIngredients(meals[7],  ingredients[35], Optional.of(2.5), Optional.of(Unit.cup.name()));
    }

    private void insertMealIngredients(Meal meal, Ingredient ingredient, Optional<Double> amount, Optional<String> unit) {
        MealIngredients mealIngredients = new MealIngredients();
        if (amount.isPresent())
            mealIngredients.setAmount(amount.get());
        if (unit.isPresent())
            mealIngredients.setUnit(unit.get());
        mealIngredients.setId(new MealIngredientId(meal, ingredient));
        mealBL.addMealIngredients(mealIngredients);
    }

    private void insertDayMeals(Meal meal , DayPlanId dayPlanId, String type) {
        DayMeal dayMeals = new DayMeal();
        dayMeals.setId(new DayMealKey(meal,dayPlanId));
        dayMeals.setType(type);
        mealBL.addDayMeals(dayMeals);
    }
    private void createDayMeals() {
        insertDayMeals(meals[0],dayPlanIds[0], MealTime.Breakfast.name());
        insertDayMeals(meals[3],dayPlanIds[0], MealTime.Lunch.name());
        insertDayMeals(meals[6],dayPlanIds[0], MealTime.Dinner.name());

        insertDayMeals(meals[1],dayPlanIds[1], MealTime.Breakfast.name());
        insertDayMeals(meals[4],dayPlanIds[1], MealTime.Lunch.name());
        insertDayMeals(meals[7],dayPlanIds[1], MealTime.Dinner.name());

        insertDayMeals(meals[2],dayPlanIds[2], MealTime.Breakfast.name());
        insertDayMeals(meals[5],dayPlanIds[2], MealTime.Lunch.name());
    }
    private void createDayPlan(){
        //change the function that sum calories by the calories of the meals
        insertDayPlan(basicPlan,dayPlanIds[0],1,"1417");
        insertDayPlan(basicPlan,dayPlanIds[1],2,"920");
        insertDayPlan(basicPlan,dayPlanIds[2],3,"770");
    }

    private void insertDayPlan(Plan plan, DayPlanId dayPlanId,  Integer dayNumber, String dailyCalories) {
        DayPlan dayPlan = new DayPlan();
        dayPlan.setDayPlanKey(new DayPlanKey(plan,dayPlanId));
        dayPlan.setDayNumber(dayNumber);
        dayPlan.setDailyCalories(dailyCalories);
        planBL.addDayPlan(dayPlan);
    }
}
