import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { response } from "express";
import { Observable, tap } from "rxjs";
import { Goal } from "../models/Goal";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";
import { JsonPipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private BASE_URL: string = "http://localhost:8080/";
  private ADD_USER_API: string = "users/adduser";
  private ADD_USER_INFO_API: string = "users/addUserInfo";
  private UPDATE_USER_INFO_API: string = "users/updateUserInfo";
  private GET_ALL_GOALS_API: string = "goals/all";
  private currUserInfo: UserInfo;
  private isCurrentScreenOnboardingValid: boolean;
  http: any;

  constructor(private httpClient: HttpClient, private router: Router) {
    // this.currUserInfo = this.getUserInfoLocalStorage();
    this.isCurrentScreenOnboardingValid = false;
  }

  registerUser(user: User): Observable<User> {
    // user.userInfo.infoId = 1; //TODO: delete this
    return this.httpClient.post<User>(this.BASE_URL + this.ADD_USER_API, user);
  }

  addUserInfo(): Observable<UserInfo> {
    const newUserInfo = new UserInfo(null);
    return this.httpClient.post<UserInfo>(this.BASE_URL + this.ADD_USER_INFO_API, newUserInfo).pipe(
      tap((response) => {
        // console.log(response);
        this.currUserInfo = response;
        this.setUserInfoLocalStorage();
      })
    );
  }

  //----------------------------------------------------------
  updateUserInfo(): Observable<any> {
    console.log(this.currUserInfo);
    // this.currUserInfo.goals = null; //TODO: delete this

    //extract to json object
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    const userInfoJson = JSON.stringify(this.currUserInfo);
    console.log(userInfoJson);

    return this.httpClient.put<any>("http://localhost:8080/users/updateUserInfo", userInfoJson, httpOptions);
  }
  //---------------------------------------------------------------

  getUserInfo(): UserInfo {
    return this.currUserInfo;
  }

  setUserInfo(newUserInfo: UserInfo) {
    this.currUserInfo = newUserInfo;
    this.setUserInfoLocalStorage();
  }

  getUserInfoLocalStorage(): UserInfo {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.currUserInfo = JSON.parse(userInfo);
    } else {
      this.currUserInfo = new UserInfo(null);
      localStorage.setItem("userInfo", JSON.stringify(this.currUserInfo));
    }
    return this.currUserInfo;
  }

  setUserInfoLocalStorage() {
    localStorage.setItem("userInfo", JSON.stringify(this.currUserInfo));
  }

  getAllGoals(): Observable<Goal[]> {
    return this.httpClient.get<Goal[]>(this.BASE_URL + this.GET_ALL_GOALS_API);
  }

  getCurrOnBoardingValidation(): boolean {
    return this.isCurrentScreenOnboardingValid;
  }
  setCurrOnBoardingValidation(bool: boolean) {
    this.isCurrentScreenOnboardingValid = bool;
  }
}
