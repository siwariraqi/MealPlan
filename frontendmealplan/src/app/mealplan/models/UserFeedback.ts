import { Meal } from "./Meal";
import { User } from "./User";

export class UserFeedback {
  constructor(    public feedbackId?: number,
                  public meal?: Meal,
                  public user?:User,
                  public isOnIt?: boolean,
                  public date?: Date,
                  public rating?: number,
                  public feedbackText?: string) {
  }
}