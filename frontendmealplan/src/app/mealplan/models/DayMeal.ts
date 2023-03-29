import { DayMealKey } from "./DayMealKey";

export class DayMeal {
  constructor(
      public id?: DayMealKey,
      public type?: string,
    ) {
  }
}