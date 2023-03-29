import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { User } from "../models/User";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private BASE_URL: string = "http://localhost:8080/";
  private LOGIN_USER_API: string = "users/login";

  private currUser: User;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenStroageService: TokenStorageService
  ) {
    this.currUser = {};
  }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.post(
      this.BASE_URL + this.LOGIN_USER_API,
      {
        email: email,
        password: password,
      },
      { responseType: "text" }
    );
    /*
      .pipe(
        tap((data) => {
          debugger;
          if (data) {
            console.log(data);
            this.tokenStroageService.saveToken(data);
            //console.log(data);
            
            if (data.email) {
              this.currUser = data;
              console.log("cur user=> ", this.currUser);
              this.setUserLocalStorage();
            }
            
          }
        })
      );
      */
  }

  getUser() {
    this.currUser = this.getUserLocalStorage();

    return this.currUser;
  }

  getUserFromSessionStorage() {
    this.currUser = this.tokenStroageService.getUser();
    console.log(this.tokenStroageService.getUser().userId);
    return this.currUser;
  }

  getUserLocalStorage(): User {
    const userInfo = localStorage.getItem("currUser");
    if (userInfo) {
      this.currUser = JSON.parse(userInfo);
    } else {
      this.currUser = new User(null);
      localStorage.setItem("currUser", JSON.stringify(this.currUser));
    }
    return this.currUser;
  }

  setUserLocalStorage() {
    localStorage.setItem("currUser", JSON.stringify(this.currUser));
  }

  // logout() {
  //   this.currUser = { };
  //   this.router.navigate(['/']);
  // }
}
