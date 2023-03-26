package org.backendmealplan.backendmealplan.bl;
import org.backendmealplan.backendmealplan.dao.DayPlanIdDAO;
import org.backendmealplan.backendmealplan.dao.DietTypesDAO;
import org.backendmealplan.backendmealplan.dao.MealsDAO;
import org.backendmealplan.backendmealplan.enums.*;
import org.apache.commons.lang3.StringEscapeUtils;
import org.backendmealplan.backendmealplan.beans.*;
import org.backendmealplan.backendmealplan.dao.PlansDAO;
import org.backendmealplan.backendmealplan.beans.DietType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InitDataBL {
  @Autowired
  UserBL userBL;

  @Autowired
  PlanBL planBL;

  @Autowired
  GoalBL goalBL;

  @Autowired
  MealBL mealBL;

  @Autowired
  MealsDAO mealsDAO;

  @Autowired
  IngredientBL ingredientBL;

  @Autowired
  GroceryListBL groceryListBl;

  @Autowired
  DayPlanIdDAO dayPlanIdDAO;

  Ingredient[] ingredients = new Ingredient[135];
  Meal[] meals = new Meal[30];
  Plan freemuimPlan, basicPlan, premiumPlan;

  DayPlanId[] dayPlanIds = new DayPlanId[28];

  @Autowired
  PlansDAO plansDAO;

  @Autowired
  DietTypesDAO dietTypesDAO;

  public void run() {
    createGoals();
    createDietType();
    createIngredients();
    createMeals();
    createMealIngredients();
    createMealTypes();
    createPlans();
    createDays();
    createDayMeals();
    createDayPlan();
  }

  private void createMealTypes() {
    insertMealTypes(meals[0],new DietType(DietTypes.DAIRY_FREE.getValue()));
    insertMealTypes(meals[0],new DietType(DietTypes.VEGAN_FRIENDLY.getValue()));
    insertMealTypes(meals[0],new DietType(DietTypes.KETO_FRIENDLY.getValue()));
    insertMealTypes(meals[0],new DietType(DietTypes.GLUTEN_FREE.getValue()));
    insertMealTypes(meals[1],new DietType(DietTypes.GLUTEN_FREE.getValue()));
    insertMealTypes(meals[1],new DietType(DietTypes.KETO_FRIENDLY.getValue()));
    insertMealTypes(meals[1],new DietType(DietTypes.DAIRY_FREE.getValue()));
    insertMealTypes(meals[2],new DietType(DietTypes.KETO_FRIENDLY.getValue()));
    insertMealTypes(meals[2],new DietType(DietTypes.VEGAN_FRIENDLY.getValue()));
    insertMealTypes(meals[3],new DietType(DietTypes.DAIRY_FREE.getValue()));
    insertMealTypes(meals[21],new DietType(DietTypes.VEGAN_FRIENDLY.getValue()));
    insertMealTypes(meals[21],new DietType(DietTypes.DAIRY_FREE.getValue()));
    insertMealTypes(meals[16],new DietType(DietTypes.KETO_FRIENDLY.getValue()));
    insertMealTypes(meals[15],new DietType(DietTypes.GLUTEN_FREE.getValue()));
    insertMealTypes(meals[15],new DietType(DietTypes.KETO_FRIENDLY.getValue()));
    insertMealTypes(meals[15],new DietType(DietTypes.VEGAN_FRIENDLY.getValue()));
    insertMealTypes(meals[15],new DietType(DietTypes.DAIRY_FREE.getValue()));
  }

  private void insertMealTypes(Meal meal, DietType dietType) {
    Meal savedMeal = this.mealsDAO.findByMealName(meal.getMealName());
    DietType savedDiet = this.dietTypesDAO.findByText(dietType.getText());
    Set<DietType> dietTypeSet = savedMeal.getDietTypes();
    dietTypeSet.add(savedDiet);
    savedMeal.setDietTypes(dietTypeSet);
    this.mealsDAO.save(savedMeal);
  }

  private void createDays() {
    for (int i = 0; i < dayPlanIds.length; i++) {
      dayPlanIds[i] = insertDays();
    }
  }

  private DayPlanId insertDays() {
    DayPlanId dayPlanId1 = new DayPlanId();
    return planBL.addDayPlanId(dayPlanId1);
  }

  private void createPlans() {
    freemuimPlan = insertPlan(PlanType.Freemium.name(), "3", 0, new ArrayList<>(), new ArrayList<>());
    List<String> includes = new ArrayList<>();
    List<String> benefits = new ArrayList<>();
    includes.add("14 Breakfasts");
    includes.add("14 Lunches");
    includes.add("14 Dinners");
    includes.add("14 Snacks");
    benefits.add("Build healthier habits");
    benefits.add("Introduce new recipes into you rotation");
    benefits.add("Eat AND enjoy the foods you're preparing&Work towards a lifestyle shift");
    basicPlan = insertPlan(PlanType.Basic.name(), "14", 29, includes, benefits);

    includes = new ArrayList<>();
    benefits = new ArrayList<>();
    includes.add("28 Breakfasts");
    includes.add("28 Lunches");
    includes.add("28 Dinners");
    includes.add("28 Snacks");
    benefits.add("Become a pro at managing your health");
    benefits.add("Build habits that actually stick");
    benefits.add("Prepare foods you'll never get sick of");
    benefits.add("Bulk up your recipe rotation with over 30 delicious and healthy recipes");
    premiumPlan = insertPlan(PlanType.Premium.name(), "28", 34, includes, benefits);
  }

  private Plan insertPlan(String planName, String length, double price, List<String> includes, List<String> benefits) {
    Plan plan = new Plan();
    plan.setPlanName(planName);
    plan.setPrice(price);
    plan.setLength(length);
    plan.setIncludes("<ul>" + includes.stream().map(include -> "<li class=\"secondary-font\">" + "<span class=\"primary-color bullet\">&#8226;</span>" + "<span>" + StringEscapeUtils.escapeHtml4(include) + "</span>" + "</li>").collect(Collectors.joining()) + "</ul>");
    plan.setBenefits("<ul>" + benefits.stream().map(benefit -> "<li class=\"secondary-font\">" + "<span class=\"primary-color bullet\">&#8226;</span>" + "<span>" + StringEscapeUtils.escapeHtml4(benefit) + "</span>" + "</li>").collect(Collectors.joining()) + "</ul>");
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

    //breakfast4
    ingredients[52] = insertIngredient("mushrooms", FoodCategories.Vegetables.name());
    ingredients[53] = insertIngredient("rapeseed oil , plus 2 drops", FoodCategories.Others.name());
    ingredients[54] = insertIngredient("cherry tomatoes , halved, or 8 tomatoes, cut into wedges", FoodCategories.Vegetables.name());
    ingredients[55] = insertIngredient("generous handfuls parsley , finely chopped", FoodCategories.Vegetables.name());
    ingredients[56] = insertIngredient("mustard", FoodCategories.Others.name());
    ingredients[57] = insertIngredient("eggs", FoodCategories.Dairy.name());

    //breakfast5
    ingredients[58] = insertIngredient("eggs, separated", FoodCategories.Dairy.name());
    ingredients[59] = insertIngredient("small banana", FoodCategories.Fruit.name());
    ingredients[60] = insertIngredient("baking powder", FoodCategories.Others.name());
    ingredients[61] = insertIngredient("vanilla extract", FoodCategories.Others.name());
    ingredients[62] = insertIngredient("low fat plain Greek yogurt and fruit to top", FoodCategories.Dairy.name());

    //breakfast6
    ingredients[63] = insertIngredient("strawberries, sliced", FoodCategories.Fruit.name());
    ingredients[64] = insertIngredient("blueberries", FoodCategories.Fruit.name());
    ingredients[65] = insertIngredient("skimmed milk", FoodCategories.Dairy.name());
    ingredients[66] = insertIngredient("flaked almonds", FoodCategories.Vegetables.name());

    //breakfast7
    ingredients[67] = insertIngredient("oats", FoodCategories.Others.name());
    ingredients[68] = insertIngredient("pecan nuts, chopped", FoodCategories.Others.name());
    ingredients[69] = insertIngredient("sunflower seeds", FoodCategories.Others.name());
    ingredients[70] = insertIngredient("pitted medjool dates, chopped", FoodCategories.Fruit.name());
    ingredients[71] = insertIngredient("high-fibre puffed wheat", FoodCategories.Others.name());
    ingredients[72] = insertIngredient("pots bio yogurt", FoodCategories.Dairy.name());
    ingredients[73] = insertIngredient("mixed berries , such as raspberries, strawberries and blueberries", FoodCategories.Fruit.name());


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


    //dinner2
    ingredients[31] = insertIngredient("wild or brown Rice (dry, uncooked)", FoodCategories.Others.name());
    ingredients[32] = insertIngredient("chicken breast (cubed)", FoodCategories.Meat.name());
    ingredients[33] = insertIngredient("Sea Salt & Black Pepper (to taste)", FoodCategories.Others.name());
    ingredients[34] = insertIngredient("large Eggs (whisked)", FoodCategories.Others.name());
    ingredients[35] = insertIngredient("Frozen Vegetable Mix", FoodCategories.Vegetables.name());

    //snack1
    ingredients[49] = insertIngredient("apple", FoodCategories.Fruit.name());
    ingredients[50] = insertIngredient("sugar salt free peanut butter", FoodCategories.Others.name());

    //snack2
    ingredients[51] = insertIngredient("chickpeas", FoodCategories.Vegetables.name());

    //snack3
    ingredients[74] = insertIngredient("Turkey", FoodCategories.Meat.name());

    //snack5
    ingredients[75] = insertIngredient("cheddar", FoodCategories.Dairy.name());

    //snack6
    ingredients[76] = insertIngredient("rice cakes", FoodCategories.Others.name());

    //snack7
    ingredients[77] = insertIngredient("red pepper", FoodCategories.Others.name());
    ingredients[78] = insertIngredient("hummus", FoodCategories.Vegetables.name());

    //lunch4
    ingredients[80] = insertIngredient("small red onions, finely chopped", FoodCategories.Vegetables.name());
    ingredients[81] = insertIngredient("ripe cherry tomatoes, cut in quarters", FoodCategories.Vegetables.name());
    ingredients[82] = insertIngredient("cucumber, chopped", FoodCategories.Others.name());
    ingredients[86] = insertIngredient("tin chickpeas In water, drained (drained weight 1 1⁄2 per tin)", FoodCategories.Vegetables.name());
    ingredients[87] = insertIngredient("tin tuna in water , drained", FoodCategories.Meat.name());
    ingredients[88] = insertIngredient("salad leaves/lettuce", FoodCategories.Vegetables.name());
    ingredients[89] = insertIngredient("lemon wedges", FoodCategories.Vegetables.name());

    //lunch5
    ingredients[79] = insertIngredient("large wholemeal tortilla wrap", FoodCategories.Others.name());
    ingredients[83] = insertIngredient("carrot", FoodCategories.Vegetables.name());
    ingredients[84] = insertIngredient("red onion, thinly sliced", FoodCategories.Vegetables.name());
    ingredients[85] = insertIngredient("yellow pepper, thickly sliced", FoodCategories.Others.name());
    ingredients[90] = insertIngredient("alfalfa", FoodCategories.Vegetables.name());

    //lunch6
    ingredients[91] = insertIngredient("Avocado Oil", FoodCategories.Others.name());
    ingredients[92] = insertIngredient("Jalapeno Pepper (seeded, minced)", FoodCategories.Others.name());
    ingredients[93] = insertIngredient("Black Beans (cooked, rinsed)", FoodCategories.Vegetables.name());
    ingredients[94] = insertIngredient("Enchilada Sauce", FoodCategories.Others.name());
    ingredients[95] = insertIngredient("avocado (sliced)", FoodCategories.Vegetables.name());
    ingredients[96] = insertIngredient("brown rice tortilla", FoodCategories.Others.name());


    //lunch7
    ingredients[97] = insertIngredient("boiling water", FoodCategories.Others.name());
    ingredients[98] = insertIngredient("frozen soya (edamame) beans, defrosted", FoodCategories.Others.name());
    ingredients[99] = insertIngredient("large tomato,sliced", FoodCategories.Vegetables.name());
    ingredients[100] = insertIngredient("cress", FoodCategories.Vegetables.name());
    ingredients[101] = insertIngredient("0% fat yogurt", FoodCategories.Dairy.name());
    ingredients[102] = insertIngredient("tahini (sesame paste)",FoodCategories.Others.name());
    ingredients[103] = insertIngredient("sesame seeds",FoodCategories.Others.name());
    ingredients[104] = insertIngredient("black pepper",FoodCategories.Others.name());

    //dinner3
    ingredients[105] = insertIngredient("oil", FoodCategories.Others.name());
    ingredients[106] = insertIngredient("onion, sliced", FoodCategories.Vegetables.name());
    ingredients[107] = insertIngredient("curry paste", FoodCategories.Others.name());
    ingredients[108] = insertIngredient("chicken stock", FoodCategories.Others.name());
    ingredients[109] = insertIngredient("cooked chicken, chopped", FoodCategories.Meat.name());
    ingredients[110] = insertIngredient("Greek 0% yoghurt",FoodCategories.Dairy.name());
    ingredients[111] = insertIngredient("Coriander, to garnish",FoodCategories.Vegetables.name());

    //dinner4
    ingredients[112] = insertIngredient("chilli flakes", FoodCategories.Others.name());
    ingredients[113] = insertIngredient("smoked paprika", FoodCategories.Others.name());
    ingredients[114] = insertIngredient("aubergine , chopped", FoodCategories.Vegetables.name());
    ingredients[115] = insertIngredient("wholemeal penne", FoodCategories.Others.name());
    ingredients[116] = insertIngredient("large handful of basil , plus extra to serve", FoodCategories.Others.name());
    ingredients[117] = insertIngredient("parmesan or vegetarian Italian-style hard cheese, finely grated",FoodCategories.Dairy.name());

    //dinner6
    ingredients[118] = insertIngredient("baby potatoes , thickly sliced", FoodCategories.Vegetables.name());
    ingredients[119] = insertIngredient("leeks, halved, washed and sliced", FoodCategories.Vegetables.name());
    ingredients[120] = insertIngredient("double cream", FoodCategories.Dairy.name());
    ingredients[121] = insertIngredient("chives , plus extra to serve", FoodCategories.Vegetables.name());
    ingredients[122] = insertIngredient("mixed rocket salad , to serve (optional)", FoodCategories.Vegetables.name());

    //dinner7
    ingredients[123] = insertIngredient("boneless, skinless chicken breast, cut in half", FoodCategories.Meat.name());
    ingredients[124] = insertIngredient("pepper, sliced", FoodCategories.Vegetables.name());
    ingredients[125] = insertIngredient("teriyaki sauce", FoodCategories.Others.name());
    ingredients[126] = insertIngredient("cooked brown rice, for serving", FoodCategories.Others.name());

    //dinner5
    ingredients[127] = insertIngredient("ginger root, grated", FoodCategories.Vegetables.name());
    ingredients[128] = insertIngredient("pack raw king prawns", FoodCategories.Others.name());
    ingredients[129] = insertIngredient("courgette spaghetti", FoodCategories.Vegetables.name());
    ingredients[130] = insertIngredient("ready-to-use rice noodles", FoodCategories.Others.name());
    ingredients[131] = insertIngredient("baby leaf spinach", FoodCategories.Vegetables.name());
    ingredients[132] = insertIngredient("grated zest and juice 1 lime", FoodCategories.Vegetables.name());
    ingredients[133] = insertIngredient("reduced-salt soy sauce", FoodCategories.Others.name());
    ingredients[134] = insertIngredient("small red chilli, finely chopped", FoodCategories.Vegetables.name());
  }

  private Ingredient insertIngredient(String ingredientName, String categoryOfFood) {
    Ingredient ingredient = new Ingredient();
    ingredient.setProductName(ingredientName);
    ingredient.setCategory(categoryOfFood);
    return ingredientBL.addIngredient(ingredient);
  }


  private void createGoals() {
    for (GoalType goalType : GoalType.values()) {
      Goal goal = new Goal();
      goal.setText(goalType.getValue());
      goalBL.addGoal(goal);
    }
  }

   private void createMeals() {
        List<String> instructions = new ArrayList<>();
        List<String> tips = new ArrayList<>();
        instructions.add("Add the milk, peanut butter, to a jar and shake well until the peanut butter has been incorporated with the milk. " +
                "Add the chia seeds and shake again to combine. Add the chia seeds and shake again to combine." +
                " The next morning, stir the muesli well. If it’s too thick, add a little more water until it reaches your preferred consistency.");
        instructions.add("Refrigerate for at least three hours or until chilled.");
        instructions.add("To serve, divide the chia pudding between bowls and top with the sliced banana.");
        tips.add("Want more flavour : Add cinnamon, sea salt, and/or vanilla extract.");
        tips.add("Want additional toppings : Berries, honey, or extra peanut butter");
        meals[0] = insertMeal(
                "Peanut butter and banana chia pudding",
                300, 15, 10, 9, 25,
                "https://www.justwhatweeat.com/wp-content/uploads/2019/06/Chocolate-Peanut-Butter-Banana-Chia-Pudding-Gluten-Free-Vegan-Dairy-Free-2C.jpg", instructions,
                "10 min",
                "180 min", tips);

        instructions = new ArrayList<>();
        instructions.add("Mix the grated carrot, mixed spice, cinnamon, and oats");
        instructions.add("Add 2⁄3 cup (X4) water and a pinch of salt");
        instructions.add("Place in 4 serving jars and cover");
        instructions.add("Place in fridge overnight");
        instructions.add("Add honey and sultanas and Greek yogurt in the morning");
        meals[1] = insertMeal("Carrot cake overnight oats",
                319, 9, 9, 6, 29,
                "https://nutritionstarringyou.com/wp-content/uploads/2017/04/carrot-cake-overnight-oats-blurred-1.jpg", instructions,
                "5 min", "Overnight", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("Soak the oats and chia seeds in 800ml water overnight");
        instructions.add("Add the oats and seeds to a pan the next morning with milk");
        instructions.add("Place in 4 bowls and serve with yogurt and fruit");
        meals[2] = insertMeal("Oat and Chia porridge",
                370, 19, 11, 8, 34,
                "https://images.food52.com/ufX6dEF27gyGoY2gvezwyqgvuC8=/1200x1200/853e1f6f-4bfb-4e5f-a1a0-185053651e57--porridge.jpg",
                instructions, "5 min", "Overnight", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("Cut the slices of salmon into small pieces.");
        instructions.add("In a small mixing bowl combine salmon with cream cheese, chopped capers, finely diced spring onion and diced cucumber, mix well.");
        instructions.add("Place mixture onto half the slices of bread, top with lettuce and remaining bread slices.");
        meals[3] = insertMeal("Smoked salmon sandwich",
                667, 6.6, 5.6, 2, 10.5,
                "https://homemadeandyummy.com/wp-content/uploads/2022/04/Simple-Smoked-Salmon-Sandwich.jpg",
                instructions, "10 min", "", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("In a small bowl, mix together the chicken and half the cream cheese.");
        instructions.add("Lay the tortilla flat and spread the remaining cream cheese, then add the arugula, chicken, and celery. Roll the tortilla tightly and enjoy!");
        meals[4] = insertMeal("Chicken and cream cheese wrap",
                151, 3.5, 3.4, 7, 23,
                "https://i.ytimg.com/vi/NsfO3EAeApY/hqdefault.jpg",
                instructions, "5 min", "Overnight", new ArrayList<>());


        instructions = new ArrayList<>();
        instructions.add("Heat the oil in a saucepan and fry the onion until softened");
        instructions.add("Add the garlic and cook for 2mins");
        instructions.add("Add the carrots, parsnip, and stock to the saucepan");
        instructions.add("Bring to boil and then reduce and simmer for 20mins");
        instructions.add("Add the milk");
        instructions.add("Blend until smooth");
        meals[5] = insertMeal("Carrot and parsnip soup",
                400, 12, 12, 4, 33,
                "https://hermiseenplace.com/wp-content/uploads/2020/09/Carrot-Soup-1-1140x912.jpg", instructions,
                "10 min", "20 min", new ArrayList<>());

        instructions = new ArrayList<>();
        tips = new ArrayList<>();
        instructions.add("Preheat the oven to 375oF and line a baking sheet with parchment paper.");
        instructions.add("Add the sweet potato and broccoli to the pan and drizzle with 2⁄3 of the oil and season with half of the salt. Stir to evenly coat the vegetables and bake for 10 minutes.");
        instructions.add("the salt. Stir to evenly coat the vegetables and bake for 10 minutes.");
        instructions.add("Meanwhile, in a small bowl combine the remaining oil, lemon juice, garlic, and parsley.");
        instructions.add("Remove the pan from the oven. Stir the vegetables and make room for the salmon in the centre of the pan.");
        instructions.add("Place the salmon on the pan and season with the remaining salt. Spoon the lemon garlic sauce over top of the fillets. " +
                "Continue to bake for 15 minutes or until the salmon is cooked through and the vegetables are tender. Divide between plates and enjoy!");
        tips.add("Optional : Add cauliflower, Brussels sprouts, cabbage, zucchini, or bell pepper");
        meals[6] = insertMeal("Lemon garlic salmon, broccoli and sweet potatoes",
                450, 20, 40, 6, 30,
                "https://littlespicejar.com/wp-content/uploads/2016/10/Roasted-Salmon-with-Broccolini-and-Sweet-Potato-Meal-Prep-10.jpg", instructions,
                "10 min", "15 min", tips);

        instructions = new ArrayList<>();
        instructions.add("Cook the rice according to the package instructions and set aside.");
        instructions.add("Heat a large non-stick pan over medium-high heat. Add the cubed chicken and season with salt and pepper. Cook to your desired doneness, then transfer to a bowl.");
        instructions.add("Add the eggs to the same pan and stir to scramble as it cooks, about two to three minutes.");
        instructions.add("Push the eggs to the side of the pan, and add the frozen vegetables. Season with salt and pepper and cook until warmed through, about three minutes.");
        instructions.add("Add the rice and cooked chicken. Stir until well combined and season with additional salt and pepper if needed. Divide into bowls and enjoy!");
        meals[7] = insertMeal("Chicken fried rice",
                450, 15, 30, 5, 40,
                "https://thehappyfoodie.co.uk/wp-content/uploads/2021/08/chicken-fried-rice-e54d23ea-751f-4497-8c96-dc9fabc644c8_s900x0_c2263x1316_l0x1032.jpg",
                instructions, "10 min", "15 min", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("1 apple cut into wedges dipped into 1⁄3 oz sugar salt free peanut butter");
        meals[8] = insertMeal("apple and peanut butter",
                159, 21, 2.6, 3, 7,
                "https://static.toiimg.com/photo/msid-71613646/71613646.jpg",
                instructions, "", "", new ArrayList<>());

        meals[9] = insertMeal("Roasted chickpeas",
                157, 16.1, 4.1, 7.2, 7.1,
                "https://thecleaneatingcouple.com/wp-content/uploads/2019/01/roasted-chickpeas-1.jpg",
                new ArrayList<>(), "30 min", "30 min", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("Heat 2 teaspoons oil in a non-stick pan");
        instructions.add("Add the mushrooms and fry with the lid on the pan for 6-8mins");
        instructions.add("Stir in the tomatoes and cook for 1-2mins");
        instructions.add("Beat the eggs with parsley and oats");
        instructions.add("Heat oil in a pan and pour in 1⁄4 of the batter and fry for 1min and then flip to the other side");
        instructions.add("Spread mustard on the wrap and add 1⁄4 of the tomatoes and mushrooms and roll up");
        meals[10] = insertMeal("Breakfast egg wraps",
                429, 16.1, 6, 28, 20,
                "https://feelgoodfoodie.net/wp-content/uploads/2018/04/Low-Carb-Egg-Wrap-09.jpg", instructions,
                "10 min", "15 min", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("Separate the eggs");
        instructions.add("Add the milk, egg yolks, banana, oats, baking powder, and vanilla to a blender and process until smooth");
        instructions.add("Whisk the egg whites until stiff peaks are formed");
        instructions.add("Mix into the batter");
        instructions.add("Heat a non-stick pan at a medium heat");
        instructions.add("Add 1-2tbsp of batter to pan and cook for 1-2minutes before flipping and cooking for another minute");
        meals[11] = insertMeal("Banana oat pancakes",
                350, 46, 5, 15, 9.9,
                "https://cleananddelicious.com/wp-content/uploads/2019/08/banana_oatmeal_pancakes_1200.jpg",
                instructions, "5 min", "300 min", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("Add the oats and 1 cup water to a pan. Bring to the boil, then turn down the heat and stir regularly for 4–5 minutes.");
        instructions.add("Stir in three-quarters of the fruit and add the milk");
        instructions.add("Bring the heat back up, mix well and put into a bowl.");
        instructions.add("Top with the rest of the fruit and the almonds, then serve.");
        tips = new ArrayList<>();
        tips.add("You can use gluten-free oats or other rolled grains, such as millet, buckwheat or rice, which are available in health food shops.");
        tips.add("You can also add cinnamon and raisins for an added iron and flavour.");
        meals[12] = insertMeal("Berry Porridge",
                300, 40, 8, 13, 10,
                "https://www.throughthefibrofog.com/wp-content/uploads/2022/04/berry-porridge-3.jpg",
                instructions, "5 min", "5 min", tips);

        instructions = new ArrayList<>();
        instructions.add("Add oats to frying pan and heat gently stirring frequently");
        instructions.add("Add the pecans and seeds to warm briefly");
        instructions.add("Take off the heat and mix through the dates, puffed wheat, and cinnamon");
        instructions.add("Serve with yogurt and mixed berries");
        meals[13] = insertMeal("Homemade Muesli",
                458, 46, 7, 17, 23,
                "https://choosingchia.com/jessh-jessh/uploads/2021/01/Easy-Muesli-5.jpg",
                instructions, "10 min", "10 min", new ArrayList<>());

        meals[14] = insertMeal("Turkey roll up",
                272, 28, 4.8, 22.8, 7,
                "https://www.culinaryhill.com/wp-content/uploads/2017/08/Turkey-Roll-Ups-Costco-Copycat-Culinary-Hill-SQ-e1580315804204.jpg",
                new ArrayList<>(), "", "", new ArrayList<>());

        meals[15] = insertMeal("almonds",
                122, 2, 12, 4, 2,
                "https://i0.wp.com/post.healthline.com/wp-content/uploads/2023/02/Almonds-Table-Bowl-1296x728-Header.jpg?w=1155&h=1528",
                new ArrayList<>(), "", "", new ArrayList<>());

        meals[16] = insertMeal("mature cheddar",
                123, 0.03, 0, 7.5, 10.4,
                "https://images.squarespace-cdn.com/content/v1/59a30ddff5e231745bbe02ac/1627986598422-NM1G7GFKMH14GPSCOF2M/MATURE+CHEDDAR+1KG+4.jpg?format=1000w",
                new ArrayList<>(), "", "", new ArrayList<>());


        meals[17] = insertMeal("2 rice cakes with 1/3oz peanut butter",
                130, 14, 1.4, 3.3, 6.7,
                "https://hurrythefoodup.com/wp-content/uploads/2021/09/2-Wholegrain-Rice-Cakes-with-Peanut-Butter.jpg",
                new ArrayList<>(), "", "", new ArrayList<>());


        meals[18] = insertMeal("Carrot or red pepper sticks dipped in 2/3oz hummus",
                82, 6.7, 3.4, 1.9, 5.4,
                "https://thetastytip.com/wp-content/uploads/2020/04/roasted-red-pepper-hummus-17.jpg",
                new ArrayList<>(), "", "", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("Add red onion, tomatoes, cucumber mix well and leave to infuse for a couple of minutes");
        instructions.add("Add the chickpeas and tuna, add olive oil");
        instructions.add("Toss salad leaves and divide by 4 , squeeze lemon wedge prior to eating");
        tips = new ArrayList<>();
        tips.add("Only add the lemon prior to eating the salad. Alternative proteins: Salmon and prawns are a good alternative to tuna.");
        meals[19] = insertMeal("Chickpea and Tuna salad",
                350, 12, 32, 13, 23,
                "https://dishingouthealth.com/wp-content/uploads/2021/05/ChickpeaTunaSalad_Square.jpg",
                instructions, "15 min", "5 min", tips);

        instructions = new ArrayList<>();
        instructions.add("Warm the tortilla in a dry frying pan for 1 minute each side (this makes it more pliable).\n" +
                "Next, put it on a board and spread the hummus over the bottom left-hand quarter, leaving a\n" +
                "2cm-margin at the edges of the wrap.");
        instructions.add("Spread the cream cheese and hazelnut and chocolate spread over the right-hand bottom\n" +
                "quarter, again leaving a 2cm-margin at the edges of the wrap");
        instructions.add("Place the carrot, onion, yellow pepper, alfalfa and lettuce on top of the hummus, and the banana and strawberry on top of the cream cheese.");
        instructions.add("Roll up the tortilla tightly from the bottom up, tucking in the sides when you get a third of the way up.");
        instructions.add("Wrap in greaseproof paper or foil and twist the ends.");
        meals[20] = insertMeal("Vegetable Wraps",
                290, 9, 9, 11, 40,
                "https://www.hiddenvalley.com/wp-content/uploads/2021/04/roasted-ranch-veggie-wrap-RDP.jpg",
                instructions, "5 min", "2 min", new ArrayList<>());

        instructions = new ArrayList<>();
        instructions.add("Preheat the oven to 375oF");
        instructions.add("In a large skillet over medium heat, pour in the oil. Once hot, add in the onion and jalapeno pepper. Cook\n" +
                "for five minutes, until softened. Reduce the heat to medium-low. Add the garlic and cook for another\n" +
                "one to two minutes. Set aside.");
        instructions.add("Add the beans, chicken, and 1⁄3 of the enchilada sauce to the skillet and season with salt and pepper. Stir\n" +
                "to combine.");
        instructions.add("Pour another 1⁄3 of the enchilada sauce on the bottom of the baking dish.");
        instructions.add("Place the tortilla on a flat surface and scoop out the chicken and bean mixture into the tortilla in a line\n" +
                "down the centre. Roll tightly and transfer to the prepared baking dish, seam side down. Repeat with the\n" +
                "remaining tortillas.");
        instructions.add("Pour the remaining enchilada sauce on top of the tortillas. Place in the oven and bake for 20 minutes.\n" +
                "Remove, let cool slightly before serving. Top with avocado. Enjoy!");
        meals[21] = insertMeal("Enchiladas",
                400, 13, 25, 10, 25,
                "https://www.isabeleats.com/wp-content/uploads/2020/05/chicken-enchiladas-2020-small-3.jpg",
                instructions, "10 min", "20 min", new ArrayList<>());

        //lunch7
        instructions = new ArrayList<>();
        instructions.add("Squeeze 1 wedge of lemon over the chicken. Place the chicken in a pan and just cover with\n" +
                "boiling water. Add a lid and simmer for 5–6 minutes.");
        instructions.add("Turn off the heat and leave with the lid on for another 5 minutes.");
        instructions.add("Meanwhile, add the soya beans, salad leaves and spring onions to your container. Next, add\n" +
                "the cucumber, tomato and cress.");
        instructions.add("In a small bowl, mix together the yogurt and tahini, and place in a small container with a\n" +
                "leak-proof lid.");
        instructions.add("Drain the chicken, allow to cool and then slice");
        instructions.add("Arrange the chicken on top of the salad. Serve with the second wedge of lemon, a sprinkle\n" +
                "of sesame seeds and a pinch of black pepper. Pop the lid on and pack with the tahini dressing,\n" +
                "if eating this salad on the go");
        meals[22] = insertMeal("Chicken and soya bean salad",
                390,15, 45, 8, 11,
                "https://www.cooksmarts.com/wp-content/uploads/2019/01/2016Q1-Asian-Chicken-Edamame-Salad-Blog-Thumbnail-800x600.jpg",
                instructions,"10 min","10 min",new ArrayList<>() );

        //dinner3
        instructions = new ArrayList<>();
        instructions.add("Head the oil in a non-stick pan. Add onion and fry for 2 minutes until browned and softened.");
        instructions.add("Add the curry paste and continue to cook for 1 minute");
        instructions.add("Add the stock, chicken, chickpeas and tomatoes, and simmer uncovered for 15 minutes.");
        instructions.add("Str throughout the yoghurt.");
        instructions.add("Serve with steamed wild rice and garnish with coriander.");
        tips = new ArrayList<>();
        tips.add(": If you’re wanting more micro-nutrients , add red peppers and mushrooms to the mix.");
        meals[23]=insertMeal("Chicken and chickpea curry", 447, 10, 42.7, 10, 30,
                "https://nishkitchen.com/wp-content/uploads/2020/01/Chicken-Chickpeas-Curry-1B.jpg",
                instructions,"15 min", "20 min",tips);

        //dinner4
        instructions = new ArrayList<>();
        instructions.add("Heat the oil in a non-stick pan and add the onions.");
        instructions.add("Cover and cook for 5mins then remove the lid and cook for a further 5mins until soft.");
        instructions.add("Add the garlic, chilli flakes, and paprika.");
        instructions.add("Add the tomatoes and 1 2⁄3 cup water the bring to the boil and simmer for 20mins.");
        instructions.add("Cook the pasta until al dente.");
        instructions.add("Add the cooked pasta to the sauce and serve with cheese.");
        meals[24]=insertMeal("Pasta arrabbiata with aubergine",500 ,12, 19, 12, 65,
                "https://images.squarespace-cdn.com/content/v1/57afb7b93e00be9be5e829ba/1494300692431-71M94Q8ZICJQVJUG4ROV/image-asset.jpeg",
                instructions, "10 min", "20 min", new ArrayList<>());

        //dinner5
        instructions = new ArrayList<>();
        instructions.add("Add the broccoli to a microwave-proof dish with 1 teaspoon of water, cover with cling film, then\n" +
                "pierce and heat on full for 1.5 minutes, then reserve.");
        instructions.add("Meanwhile, heat the oil in a non-stick pan or wok, then add the spring onions and pepper. Cook for\n" +
                "2-3 minutes over a high heat, stirring constantly.");
        instructions.add("Next, add the ginger, chilli and garlic to the pan and cook for 1 minute.");
        instructions.add("Add the king prawns, water, courgette spaghetti, noodles and reserved broccoli and mix well. Add\n" +
                "a lid and cook for 2 minutes.");
        instructions.add("Add the spinach, lime juice, zest and soy sauce and mix again.");
        instructions.add("Cover and heat for another 2-3 minutes.");
        instructions.add("Make sure the dish is heated through and the prawns are pink, then serve immediately.");
        tips = new ArrayList<>();
        tips.add(":Try adding salmon or another fish instead of prawns.");
        tips.add(":For a vegetarian/vegan version, use mushrooms or tofu in place of prawns.");
        meals[25]=insertMeal("Prawn Noodles",190 ,3, 13, 5, 25,
                "https://production-media.gousto.co.uk/cms/mood-image/3540---Spicy-Peanut-King-Prawn-Noodles2821-copy-1624026464652.jpg",
                instructions, "15 min", "10 min", tips);

        //dinner6
        instructions = new ArrayList<>();
        instructions.add("Heat the oven to 400°F or gas 6.");
        instructions.add("Parboil potatoes for 8mins.");
        instructions.add("Drain potatoes and leave to dry.");
        instructions.add("Place the potatoes in the oven for 20mins.");
        instructions.add("Heat the oil in a frying pan over a medium heat and add the leek frying for 5mins.");
        instructions.add("Stir in the garlic and cook for 1min.");
        instructions.add("Add the cream, capers, 1⁄3 cup water and bring to boil.");
        instructions.add("Stir in the chives.");
        instructions.add("Pour the creamy leek mixture over the potatoes and sit the salmon fillets on top.");
        instructions.add("Grill for 7-8mins.");
        instructions.add("Serve with capers, chives, and rocket.");
        meals[26]=insertMeal("Salmon, leek and potato tray bake",714 ,52, 39, 5, 20,
                "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/creamy-salmon-leek-potato-traybake-367b3ff.jpg",
                instructions, "15 min", "25 min", new ArrayList<>());

        //dinner7
        instructions = new ArrayList<>();
        instructions.add("Place chicken, broccoli, carrots, bell pepper on a foil-lined sheet pan, drizzle with teriyaki sauce and toss\n" +
                "to coat. Bake at 400°F until chicken is cooked through and vegetables are tender, about 15–20 minutes.\n" +
                "Serve over brown rice..");
        meals[27]=insertMeal("Chicken teriyaki with vegetables",350 ,6, 39, 4, 38,
                "https://www.wellplated.com/wp-content/uploads/2019/07/Teriyaki-Stir-Fry-Vegetables-with-Chicken.jpg",
                instructions, "10 min", "20 min", new ArrayList<>());
    }

  private void createDietType() {
    for (DietTypes goalType : DietTypes.values()) {
      DietType diet = new DietType();
      diet.setText(goalType.getValue());
      mealBL.addDietType(diet);
    }
  }


  private Meal insertMeal(String MealName, int calories, double fat, double protein, double fibre, double carbs, String imageUrl, List<String> instructions, String prepareTime, String cookTime, List<String> tips) {
    Meal meal = new Meal();
    meal.setMealName(MealName);
    meal.setCalories(calories);
    meal.setCarbs(carbs);
    meal.setFibre(fibre);
    meal.setProtein(protein);
    meal.setFat(fat);
    meal.setImageUrl(imageUrl);
    meal.setInstructions("<ul>" + instructions.stream().map(instruction -> "<li>" + instruction + "</li>").collect(Collectors.joining()) + "</ul>");
    meal.setPrepareTime(prepareTime);
    meal.setCookTime(cookTime);
    meal.setTips("<ul>" + tips.stream().map(tip -> "<li>" + tip + "</li>").collect(Collectors.joining()) + "</ul>");
      try {
          return mealBL.addMeal(meal);
      } catch (Exception e) {
          throw new RuntimeException(e);
      }
  }

  private void createMealIngredients() {
    //breakfast1
    insertMealIngredients(meals[0], ingredients[0], Optional.of(4.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[0], ingredients[1], Optional.of(4.5), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[0], ingredients[2], Optional.of(4.25), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[0], ingredients[3], Optional.of(4.0), Optional.empty());
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
    insertMealIngredients(meals[7], ingredients[31], Optional.of(0.667), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[7], ingredients[32], Optional.of(16.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[7], ingredients[33], Optional.empty(), Optional.empty());
    insertMealIngredients(meals[7], ingredients[34], Optional.of(3.0), Optional.empty());
    insertMealIngredients(meals[7], ingredients[35], Optional.of(2.5), Optional.of(Unit.cup.name()));

    //snack1
    insertMealIngredients(meals[8], ingredients[49], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[8], ingredients[50], Optional.of(0.333), Optional.of(Unit.oz.name()));

    //snack2
    insertMealIngredients(meals[9], ingredients[51], Optional.of(3.5), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[9], ingredients[42], Optional.of(1.0), Optional.of(Unit.teaspoon.name()));

    //breakfast 4
    insertMealIngredients(meals[10], ingredients[52], Optional.of(1.0), Optional.of(Unit.lb.name()));
    insertMealIngredients(meals[10], ingredients[53], Optional.of(4.0), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[10], ingredients[54], Optional.of(11.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[10], ingredients[55], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[10], ingredients[57], Optional.of(10.0), Optional.empty());
    insertMealIngredients(meals[10], ingredients[36], Optional.of(8.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[10], ingredients[56], Optional.of(4.0), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[10], ingredients[57], Optional.of(10.0), Optional.empty());

    //breakfast 5
    insertMealIngredients(meals[11], ingredients[38], Optional.of(1.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[11], ingredients[58], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[11], ingredients[59], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[11], ingredients[22], Optional.of(7.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[11], ingredients[60], Optional.of(4.0), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[11], ingredients[61], Optional.of(0.5), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[11], ingredients[42], Optional.empty(), Optional.empty());
    insertMealIngredients(meals[11], ingredients[62], Optional.of(1.0), Optional.empty());

    //breakfast 6
    insertMealIngredients(meals[12], ingredients[22], Optional.of(2.5), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[12], ingredients[63], Optional.of(40.0), Optional.empty());
    insertMealIngredients(meals[12], ingredients[64], Optional.of(2.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[12], ingredients[65], Optional.of(5.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[12], ingredients[66], Optional.of(8.0), Optional.of(Unit.teaspoon.name()));

    //breakfast7
    insertMealIngredients(meals[13], ingredients[67], Optional.of(3.5), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[13], ingredients[68], Optional.of(12.0), Optional.empty());
    insertMealIngredients(meals[13], ingredients[69], Optional.of(2.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[13], ingredients[70], Optional.of(6.0), Optional.empty());
    insertMealIngredients(meals[13], ingredients[71], Optional.of(1.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[13], ingredients[72], Optional.of(4.0), Optional.empty());
    insertMealIngredients(meals[13], ingredients[73], Optional.of(10.5), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[13], ingredients[21], Optional.of(1.0), Optional.of(Unit.teaspoon.name()));

    //snack3
    insertMealIngredients(meals[14], ingredients[67], Optional.empty(), Optional.empty());
    //snack4
    insertMealIngredients(meals[15], ingredients[66], Optional.of(0.667), Optional.of(Unit.oz.name()));

    //snack5
    insertMealIngredients(meals[16], ingredients[75], Optional.of(1.0), Optional.of(Unit.oz.name()));
    //snack6
    insertMealIngredients(meals[17], ingredients[76], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[17], ingredients[1], Optional.of(0.33), Optional.of(Unit.oz.name()));

    //snack7
    insertMealIngredients(meals[18], ingredients[45], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[18], ingredients[77], Optional.empty(), Optional.empty());
    insertMealIngredients(meals[18], ingredients[78], Optional.of(0.667), Optional.of(Unit.oz.name()));

    //lunch4
    insertMealIngredients(meals[19], ingredients[13], Optional.of(2.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[19], ingredients[80], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[19], ingredients[81], Optional.of(1.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[19], ingredients[82], Optional.empty(), Optional.empty());
    insertMealIngredients(meals[19], ingredients[86], Optional.of(30.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[19], ingredients[87], Optional.of(4.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[19], ingredients[88], Optional.of(5.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[19], ingredients[89], Optional.of(4.0), Optional.empty());

    //lunch5
    insertMealIngredients(meals[20], ingredients[79], Optional.of(4.0), Optional.empty());
    insertMealIngredients(meals[20], ingredients[78], Optional.of(4.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[20], ingredients[83], Optional.of(4.0), Optional.empty());
    insertMealIngredients(meals[20], ingredients[84], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[20], ingredients[85], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[20], ingredients[90], Optional.empty(), Optional.of(Unit.handful.name()));
    insertMealIngredients(meals[20], ingredients[10], Optional.empty(), Optional.of(Unit.handful.name()));

    //lunch6
    insertMealIngredients(meals[21], ingredients[91], Optional.of(2.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[21], ingredients[43], Optional.of(1.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[21], ingredients[92], Optional.of(0.667), Optional.empty());
    insertMealIngredients(meals[21], ingredients[16], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[21], ingredients[93], Optional.of(7.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[21], ingredients[26], Optional.of(8.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[21], ingredients[94], Optional.of(10.5), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[21], ingredients[33], Optional.empty(), Optional.empty());
    insertMealIngredients(meals[21], ingredients[96], Optional.of(4.0), Optional.empty());
    insertMealIngredients(meals[21], ingredients[95], Optional.of(0.667), Optional.empty());

    //lunch7
    insertMealIngredients(meals[22], ingredients[32], Optional.of(4.4), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[22], ingredients[89], Optional.of(4.0), Optional.empty());
    insertMealIngredients(meals[22], ingredients[97], Optional.of(2.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[22], ingredients[98], Optional.of(1.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[22], ingredients[88], Optional.of(4.0), Optional.of(Unit.handful.name()));
    insertMealIngredients(meals[22], ingredients[7], Optional.of(8.0), Optional.empty());
    insertMealIngredients(meals[22], ingredients[8], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[22], ingredients[99], Optional.of(4.0), Optional.empty());
    insertMealIngredients(meals[22], ingredients[100], Optional.of(2.0), Optional.of(Unit.punnet.name()));
    insertMealIngredients(meals[22], ingredients[101], Optional.of(4.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[22], ingredients[102], Optional.of(4.0), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[22], ingredients[103], Optional.of(2.0), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[22], ingredients[104],Optional.empty(), Optional.empty());

    //dinner3
    insertMealIngredients(meals[23], ingredients[105], Optional.of(1.0), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[23], ingredients[106], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[23], ingredients[107], Optional.of(1.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[23], ingredients[108], Optional.of(1.5), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[23], ingredients[109], Optional.of(7.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[23], ingredients[86], Optional.of(14.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[23], ingredients[99], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[23], ingredients[110], Optional.of(1.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[23], ingredients[111], Optional.empty(), Optional.empty());

    //dinner4
    insertMealIngredients(meals[24], ingredients[53], Optional.of(2.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[24], ingredients[106], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[24], ingredients[44], Optional.of(4.0), Optional.empty());
    insertMealIngredients(meals[24], ingredients[112], Optional.of(2.0), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[24], ingredients[113], Optional.of(2.0), Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[24], ingredients[99], Optional.of(28.0), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[24], ingredients[47], Optional.of(1.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[24], ingredients[114], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[24], ingredients[115], Optional.of(9.5), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[24], ingredients[116], Optional.of(1.0), Optional.of(Unit.handful.name()));
    insertMealIngredients(meals[24], ingredients[117], Optional.of(1.5), Optional.of(Unit.oz.name()));

    //dinner5
    insertMealIngredients(meals[25], ingredients[12], Optional.of(2.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[25], ingredients[53], Optional.of(2.0),  Optional.of(Unit.teaspoon.name()));
    insertMealIngredients(meals[25], ingredients[7], Optional.of(6.0), Optional.empty());
    insertMealIngredients(meals[25], ingredients[77], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[25], ingredients[127], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[25], ingredients[134], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[25], ingredients[44], Optional.of(3.0), Optional.empty());
    insertMealIngredients(meals[25], ingredients[128], Optional.of(4.2), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[25], ingredients[97], Optional.of(0.33), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[25], ingredients[129], Optional.of(0.5), Optional.of(Unit.lb.name()));
    insertMealIngredients(meals[25], ingredients[130], Optional.of(10.6), Optional.of(Unit.oz.name()));
    insertMealIngredients(meals[25], ingredients[131], Optional.of(1.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[25], ingredients[132], Optional.of(0.5), Optional.empty());
    insertMealIngredients(meals[25], ingredients[133], Optional.of(2.0),  Optional.of(Unit.teaspoon.name()));

    //dinner6
    insertMealIngredients(meals[26], ingredients[118], Optional.of(1.0), Optional.of(Unit.lb.name()));
    insertMealIngredients(meals[26], ingredients[42], Optional.of(4.0),  Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[26], ingredients[119], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[26], ingredients[44], Optional.of(2.0), Optional.empty());
    insertMealIngredients(meals[26], ingredients[120], Optional.of(0.66), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[26], ingredients[6], Optional.of(2.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[26], ingredients[121], Optional.of(2.0), Optional.of(Unit.tablespoon.name()));
    insertMealIngredients(meals[26], ingredients[18], Optional.of(4.0), Optional.empty());
    insertMealIngredients(meals[26], ingredients[122], Optional.empty(), Optional.empty());

    //dinner7
    insertMealIngredients(meals[27], ingredients[123], Optional.of(1.5), Optional.of(Unit.lb.name()));
    insertMealIngredients(meals[27], ingredients[12], Optional.of(3.0),  Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[27], ingredients[83], Optional.of(1.0), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[27], ingredients[124], Optional.of(1.0), Optional.empty());
    insertMealIngredients(meals[27], ingredients[125], Optional.of(0.25), Optional.of(Unit.cup.name()));
    insertMealIngredients(meals[27], ingredients[126], Optional.of(2.0), Optional.of(Unit.cup.name()));

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

  private void insertDayMeals(Meal meal, DayPlanId dayPlanId, String type) {
    DayMeal dayMeals = new DayMeal();
    dayMeals.setId(new DayMealKey(meal, dayPlanId));
    dayMeals.setType(type);
    mealBL.addDayMeals(dayMeals);
  }

  private void createDayMeals() {
    insertDayMeals(meals[0], dayPlanIds[0], MealTime.Breakfast.name());
    insertDayMeals(meals[3], dayPlanIds[0], MealTime.Lunch.name());
    insertDayMeals(meals[8], dayPlanIds[0], MealTime.Snacks.name());
    insertDayMeals(meals[6], dayPlanIds[0], MealTime.Dinner.name());
    insertDayMeals(meals[9], dayPlanIds[0], MealTime.Snacks.name());

    insertDayMeals(meals[1], dayPlanIds[1], MealTime.Breakfast.name());
    insertDayMeals(meals[4], dayPlanIds[1], MealTime.Lunch.name());
    insertDayMeals(meals[15], dayPlanIds[1], MealTime.Snacks.name());
    insertDayMeals(meals[7], dayPlanIds[1], MealTime.Dinner.name());
    insertDayMeals(meals[18], dayPlanIds[1], MealTime.Snacks.name());

    insertDayMeals(meals[2], dayPlanIds[2], MealTime.Breakfast.name());
    insertDayMeals(meals[5], dayPlanIds[2], MealTime.Lunch.name());
    insertDayMeals(meals[8], dayPlanIds[2], MealTime.Snacks.name());
    insertDayMeals(meals[23], dayPlanIds[2], MealTime.Dinner.name());
    insertDayMeals(meals[15], dayPlanIds[2], MealTime.Snacks.name());

    insertDayMeals(meals[10], dayPlanIds[3], MealTime.Breakfast.name());
    insertDayMeals(meals[19], dayPlanIds[3], MealTime.Lunch.name());
    insertDayMeals(meals[16], dayPlanIds[3], MealTime.Snacks.name());
    insertDayMeals(meals[27], dayPlanIds[3], MealTime.Dinner.name());
    insertDayMeals(meals[17], dayPlanIds[3], MealTime.Snacks.name());

    insertDayMeals(meals[11], dayPlanIds[4], MealTime.Breakfast.name());
    insertDayMeals(meals[20], dayPlanIds[4], MealTime.Lunch.name());
    insertDayMeals(meals[14], dayPlanIds[4], MealTime.Snacks.name());
    insertDayMeals(meals[24], dayPlanIds[4], MealTime.Dinner.name());
    insertDayMeals(meals[9], dayPlanIds[4], MealTime.Snacks.name());

    insertDayMeals(meals[12], dayPlanIds[5], MealTime.Breakfast.name());
    insertDayMeals(meals[21], dayPlanIds[5], MealTime.Lunch.name());
    insertDayMeals(meals[8], dayPlanIds[5], MealTime.Snacks.name());
    insertDayMeals(meals[26], dayPlanIds[5], MealTime.Dinner.name());
    insertDayMeals(meals[18], dayPlanIds[5], MealTime.Snacks.name());

    insertDayMeals(meals[13], dayPlanIds[6], MealTime.Breakfast.name());
    insertDayMeals(meals[22], dayPlanIds[6], MealTime.Lunch.name());
    insertDayMeals(meals[16], dayPlanIds[6], MealTime.Snacks.name());
    insertDayMeals(meals[25], dayPlanIds[6], MealTime.Dinner.name());
    insertDayMeals(meals[14], dayPlanIds[6], MealTime.Snacks.name());

  }

  private void createDayPlan() {
    insertDayPlan(basicPlan, dayPlanIds[0], 1);
    insertDayPlan(basicPlan, dayPlanIds[1], 2);
    insertDayPlan(basicPlan, dayPlanIds[2], 3);
    insertDayPlan(basicPlan, dayPlanIds[3], 4);
    insertDayPlan(basicPlan, dayPlanIds[4], 5);
    insertDayPlan(basicPlan, dayPlanIds[5], 6);
    insertDayPlan(basicPlan, dayPlanIds[6], 7);

  }

  private void insertDayPlan(Plan plan, DayPlanId dayPlanId, Integer dayNumber) {
    DayPlan dayPlan = new DayPlan();
    dayPlan.setDayPlanKey(new DayPlanKey(plan, dayPlanId));
    dayPlan.setDayNumber(dayNumber);
    planBL.addDayPlan(dayPlan);
    plan.getDayPlanIdList().add(dayPlanId);
  }
}

    /*

    private void addToGroceryList(Plan plan, Long dayPlanIdId, Integer dayNumber) {
        Integer week = (dayNumber%7==0)? dayNumber/7: dayNumber/7 +1;
        List<DayPlanId> dayPlanIdsList = dayPlanIdDAO.findByDayPlanId(dayPlanIdId);
        List<Meal> dayMeals = dayPlanIdsList.get(0).getMeals();

        for(int i=0; i<dayMeals.size(); i++){
            Meal currentMeal = dayMeals.get(i);
            try {
                groceryListBl.addMealIngredientsToGroceries(plan, currentMeal, week);
            } catch (UNAUTHORIZEDException e) {
                e.printStackTrace();
            }
        }
    }

    private void initGroceries(){
        List<Plan> allPlans = planBL.getAllPlans();
        for(int i=0; i<allPlans.size(); i++){
            Plan currPlan = allPlans.get(i);
            List<DayPlanId> planDayIds = currPlan.getDayPlanIdList();
            for(int j=0; j<planDayIds.size(); j++){
                List<Meal> dayPlanMeals = planDayIds.get(j).getMeals();

                for(int k=0; k<dayPlanMeals.size(); k++){
                    Meal currMeal = dayPlanMeals.get(k);
                    groceryListBl.addMealIngredientsToGroceries(currPlan, currMeal, );
                }
            }
        }
    }
    */
