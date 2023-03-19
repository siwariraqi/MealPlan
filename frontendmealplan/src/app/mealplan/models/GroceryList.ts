import { Plan } from "./Plan";
import { User } from "./User";

export class GroceryList {
  constructor(
    public groceryId?: number,
    public week?: number,
    public amount?: number,
    public unit?: string,
    public ingredientId?: string,
    public plan?: Plan,
    public users?: User[]
  ) {}
}
