import { DayPlan } from "./DayPlan";
import { Meal } from "./Meal";

export class DayPlanId {
  constructor(
    public dayPlanId: number,
    public meals: Meal[],
    public dayPlan : DayPlan
  ) {}
}