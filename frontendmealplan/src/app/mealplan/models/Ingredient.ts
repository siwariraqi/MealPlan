import { Meal } from "./Meal";

//remove field mealList
export class Ingredient {
  constructor(
    public ingredientId?: number,
    public category?: string,
    public productName?: string,
    public mealList?: Meal[]
  ) {}
}
