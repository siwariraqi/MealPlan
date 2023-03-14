import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Goal } from "../models/Goal";
import { UserInfo } from "../models/UserInfo";

@Injectable({
  providedIn: "root",
})
export class UserinfoService {
  SERVER_BASE_URL = "http://127.0.0.1:8080/users/";
  GET_URL = this.SERVER_BASE_URL + "allGoals";
  POSTNEWUSER_URL = this.SERVER_BASE_URL + "addUserInfo";
  PUTUPDATE_URL = this.SERVER_BASE_URL + "updateUserInfo";

  constructor(private httpClient: HttpClient) {}

  public getAllGoals() {
    return this.httpClient.get<Goal[]>(this.GET_URL, {
      withCredentials: false,
    });
  }

  public AddUserInfo(userInfo: UserInfo) {
    return this.httpClient.post<UserInfo>(this.POSTNEWUSER_URL, userInfo, {
      withCredentials: false,
    });
  }

  public UpdateUserInfo(userinfo: UserInfo) {
    return this.httpClient.put<UserInfo>(this.PUTUPDATE_URL, userinfo, {
      withCredentials: false,
    });
  }
}
