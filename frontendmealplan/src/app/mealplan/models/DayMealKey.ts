import { DayPlanId } from "./DayPlanId";
import { Meal } from "./Meal";

export class DayMealKey {
   constructor(
     public meal?: Meal,
     public planDayId?: DayPlanId
   ) {}
}