import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    return this.httpClient.post<User>(this.BASE_URL + this.ADD_USER_API, user);
  }

  addUserInfo(): Observable<UserInfo> {
    this.currUserInfo = this.getUserInfoLocalStorage();
    if (!this.currUserInfo || !this.currUserInfo?.infoId) {
      this.currUserInfo = new UserInfo(null);
    }
    return this.httpClient.post<UserInfo>(this.BASE_URL + this.ADD_USER_INFO_API, this.currUserInfo).pipe(
      tap((response) => {
        // console.log(response);
        this.setUserInfo(response);
      })
    );
  }

  //----------------------------------------------------------
  updateUserInfo(): Observable<UserInfo> {
    console.log(this.currUserInfo);

    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }), //telling the server that angular is sending a json
    };
    const userInfoJson = JSON.stringify(this.currUserInfo); //convert userinfo object to json

    console.log(userInfoJson);

    return this.httpClient.put<UserInfo>(this.BASE_URL + this.UPDATE_USER_INFO_API, userInfoJson, httpOptions);
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
