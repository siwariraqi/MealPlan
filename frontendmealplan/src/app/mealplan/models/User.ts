import { UserInfo } from "./UserInfo";
import { UserFeedback } from "./UserFeedback";
import { Plan } from "./Plan";

export class User {
  constructor(
    public userId?: number,
    public email?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public phoneNumber?: string,
    public userInfo?: UserInfo,
    public plan?: Plan,
    public paymentsIds?: number[],
    public ingredientsChangesId?: number[],
    public feedBackIds?: UserFeedback[]
  ) {}
}
