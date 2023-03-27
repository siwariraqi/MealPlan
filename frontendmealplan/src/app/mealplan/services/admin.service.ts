import { Injectable } from '@angular/core';
import { Meal } from '../models/Meal';
import { User } from '../models/User';
import { UserFeedback } from '../models/UserFeedback';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  GETALLUSERS_URL = "admin/getall/";
  GETALLFEEDBACKS_URL = "admin/getFeedbacks/";
  GETALLMEALS_URL="admin/getMeals/";
  DELETEUSER_URL="admin/delete";
  RESETUSER_URL="admin/resetUser";
  UPDATEUSERD_URL="admin/update";
  CHANGEPLAN_URL="admin/changeRole"
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

  deleteUser(userId:number){
    return this.apiService.delete<User>(this.DELETEUSER_URL+"?userId="+`${userId}`)
  }

  resetUser(userId:number){
    return this.apiService.put<User>(this.RESETUSER_URL+"?userId="+`${userId}`)
  }

  updateUserPlan(userId:number,planName:string){
    console.log('hello'+userId+planName)
    return this.apiService.put<User>(this.UPDATEUSERD_URL+"?userId="+`${userId}`+"&planName="+`${planName}`)
  }

  changeRole(userId:number,isAdmin:boolean){
    return this.apiService.put<User>(this.CHANGEPLAN_URL+"?userId="+`${userId}`+"&isAdmin="+`${isAdmin}`)
  }

}
