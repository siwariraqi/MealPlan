import { UserFeedback } from "./UserFeedback";
import { Ingredient } from "./Ingredient";
import { DietType } from "./DietType";

export class Meal{
  constructor(     public mealId?: number,
                     public mealName?: string,
                     public imageUrl?: string,
                     public calories?: number,
                     public instructions?: string,
                     public prepareTime?: string,
                     public cookTime?: string,
                     public fat?: number,
                     public protein?: number,
                     public carbs?: number,
                     public fibre?: number,
                     public tips?: string,
                     public dietTypes?: DietType[],
                     public feedbacks?: UserFeedback[],
                     public mealIngredients?: Ingredient[],
                     ) {
  }
}





