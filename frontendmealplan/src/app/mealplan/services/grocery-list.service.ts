import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GroceryList } from "../models/GroceryList";

@Injectable({
  providedIn: "root",
})
export class GroceryListService {
  constructor(private httpClient: HttpClient) {}

  SERVER_BASE_URL = "http://127.0.0.1:8080/grocerylist/";
  GET_URL = this.SERVER_BASE_URL + "getIngredients/";
  DELETE_URL = this.SERVER_BASE_URL + "deleteIngredients/";

  public getIngredients(week: number, userId: number) {
    const url = this.GET_URL + week + "/" + userId;
    let httpParams = new HttpParams().append("userId", userId);

    return this.httpClient.get<GroceryList[]>(url, {
      withCredentials: false,
    });
  }

  public DeleteIngredient(grocerylistID: number, userId: number) {
    const url = this.DELETE_URL + grocerylistID + "/" + userId;

    return this.httpClient.post(url, {
      withCredentials: false,
    });
  }
}
