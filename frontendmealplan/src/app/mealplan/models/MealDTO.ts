import { DayMealDTO } from "./DayMealDTO";
import { IngredientDTO } from "./IngredientDTO";

export class MealDTO {
    constructor(
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
        public dietTypes?: string[],
        public ingredients?: IngredientDTO[],
        public dayMealDTOList?: DayMealDTO[]
    ) {}
}



