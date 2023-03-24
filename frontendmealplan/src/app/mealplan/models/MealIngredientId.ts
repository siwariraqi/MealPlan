import { Ingredient } from "./Ingredient";
import { Meal } from "./Meal";

export class MealIngredientId{
    constructor(
        public meal?:Meal,
        public ingredient?:Ingredient
    ){}
}