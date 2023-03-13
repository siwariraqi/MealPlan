import { UserFeedback } from "./UserFeedback";
import { Ingredient } from "./Ingredient";

export class Meal{
  constructor(     public mealId: number,
                     public mealName: string,
                     public imageUrl: string,
                     public calories: number,
                     public instructions: string,
                     public prepareTime: number,
                     public cookTime: number,
                     public fat: number,
                     public protein: number,
                     public carbs: number,
                     public fiber: number,
                     public tips: string,
                     public dietType: string,
                     public feedbacks: UserFeedback[],
                     public mealIngredients: Ingredient[],
                     ) {
  }
}





