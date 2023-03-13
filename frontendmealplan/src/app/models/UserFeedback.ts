import { Meal } from "./Meal";

export class UserFeedback {
  constructor(    public feedbackId: number,
                  public meal: Meal,
                  public isOnIt: boolean,
                  public date: Date,
                  public rating: number,
                  public feedbackText: string) {
  }
}