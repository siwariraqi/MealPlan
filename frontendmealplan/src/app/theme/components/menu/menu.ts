import { Menu } from "./menu.model";

export const horizontalMenuItems = [
  new Menu(298, "REGISTER", "/mealplan/register", null, null, false, 20),
  new Menu(299, "LOGIN", "/mealplan/login", null, null, false, 20),
  new Menu(300, "NAV.ADMIN", "/adminside", null, null, false, 0),
  new Menu(301, "NAV.DAILY_PLAN", "/mealplan/meals", null, null, false, 0),
  new Menu(302, "NAV.RECIPES", "/mealplan/recipes", null, null, false, 0),
  new Menu(304, "NAV.GROCERY_LIST", "/mealplan/groceryList", null, null, false, 0),
  new Menu(307, "ACCOUNT", null, null, null, true, 10),
];

export const verticalMenuItems = [
  new Menu(298, "REGISTER", "/mealplan/register", null, null, false, 20),
  new Menu(299, "LOGIN", "/mealplan/login", null, null, false, 20),
  new Menu(300, "NAV.ADMIN", "/adminside", null, null, false, 0),
  new Menu(301, "NAV.DAILY_PLAN", "/mealplan/meals", null, null, false, 0),
  new Menu(302, "NAV.RECIPES", "/mealplan/recipes", null, null, false, 0),
  new Menu(304, "NAV.GROCERY_LIST", "/mealplan/groceryList", null, null, false, 0),
  new Menu(307, "ACCOUNT", null, null, null, true, 0),

  new Menu(308, "ACCOUNT SETTINGS", "/mealplan/account", null, null, null, 307),
  // new Menu(309, "FAVORITES", "/mealplan/account/favorites", null, null, null, 307),
  new Menu(310, "HELP", "/mealplan/account/help-support", null, null, null, 307),
  new Menu(311, "SIGN OUT", "/mealplan/logout", null, null, null, 307),
];
