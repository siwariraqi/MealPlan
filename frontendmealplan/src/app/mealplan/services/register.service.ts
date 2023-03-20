import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { Goal } from "../models/Goal";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private BASE_URL: string = "http://localhost:8080/";
  private ADD_USER_API: string = "users/adduser";
  private ADD_USER_INFO_API: string = "users/updateUserInfo";
  private GET_ALL_GOALS_API: string = "goals/all";
  private currUserInfo: UserInfo;
  private isCurrentScreenOnboardingValid: boolean;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currUserInfo = this.getUserInfoLocalStorage();
    this.isCurrentScreenOnboardingValid = false;
  }

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL + this.ADD_USER_API, user);
  }

  updateUserInfo(): Observable<UserInfo> {
    console.log(this.currUserInfo);

    return this.httpClient
      .put<UserInfo>(this.BASE_URL + this.ADD_USER_INFO_API, this.currUserInfo)
      .pipe(
        tap((response) => {
          this.currUserInfo = response;
          this.setUserInfoLocalStorage();
        })
      );
  }

  getUserInfo(): UserInfo {
    return this.currUserInfo;
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
