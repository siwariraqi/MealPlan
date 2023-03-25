import { Injectable } from '@angular/core';
import { Meal } from '../models/Meal';
import { User } from '../models/User';
import { UserFeedback } from '../models/UserFeedback';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  GETALLUSERS_URL = "users/getall/";
  GETALLFEEDBACKS_URL = "feedback/getall/";
  GETALLMEALS_URL="meals/getall/";

  constructor(private apiService: ApiService) { }

  getAllUsers() {
    return this.apiService.get<User[]>(this.GETALLUSERS_URL)
  }

  getAllFeedbacks() {
    return this.apiService.get<UserFeedback[]>(this.GETALLFEEDBACKS_URL)
  }

  getAllMeals() {
    return this.apiService.get<Meal[]>(this.GETALLMEALS_URL)
  }

}
