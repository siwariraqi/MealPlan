import { User } from "./User";
import { DayPlanId } from "./DayPlanId";

export class Plan {
  constructor(    public planId?: number,
                  public planName?: string,
                  public length?: string,
                  public price?: number,
                  public includes?: string,
                  public benefits?: string,
                  public users?: User[],
                  public dayPlanIdList?: DayPlanId[],
                  public groceryListIds?: number[],
              ) {
  }
}
