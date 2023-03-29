import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GroceryList } from "../models/GroceryList";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class GroceryListService {
  constructor(private httpClient: HttpClient, private apiService: ApiService) {}

  SERVER_BASE_URL = "grocerylist/";
  GET_URL = this.SERVER_BASE_URL + "getIngredients/";
  DELETE_URL = this.SERVER_BASE_URL + "deleteIngredients/";

  public getIngredients(week: number) {
    const url = this.GET_URL + week;

    return this.apiService.get<GroceryList[]>(url);
    /*
    return this.httpClient.get<GroceryList[]>(url, {
      withCredentials: false,
    });
    */
  }

  public DeleteIngredient(grocerylistID: number) {
    const url = this.DELETE_URL + grocerylistID;
    return this.apiService.post(url);
    /*
    const url = this.DELETE_URL + groceryListID + userId
    return this.httpClient.post(url, {
      withCredentials: false,
    });
    */
  }
}
