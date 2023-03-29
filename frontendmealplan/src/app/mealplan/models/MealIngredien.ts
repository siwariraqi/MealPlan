import { MealIngredientId } from "./MealIngredientId";

export class MealIngredients{
    constructor(
        public id?:MealIngredientId,
        public amount?:number,
        public unit?:string
    ){}
}