import { Ingredient } from "./Ingredient";
import { Plan } from "./Plan";
import { User } from "./User";

//remove fields : plan and users
export class GroceryList {
  constructor(
    public groceryId?: number,
    public week?: number,
    public amount?: number,
    public unit?: string,
    public ingredient?: Ingredient,
    public plan?: Plan,
    public users?: User[]
  ) {}
}
