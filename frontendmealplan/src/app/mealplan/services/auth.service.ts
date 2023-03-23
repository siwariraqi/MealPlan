import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../models/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private BASE_URL: string = "http://localhost:8080/";
  private LOGIN_USER_API: string = "users/login";

  private currUser: User;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currUser = {};
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.BASE_URL + this.LOGIN_USER_API, {
      email: email,
      password: password,
    });
  }

  getUser() {
    return this.currUser;
  }

  // logout() {
  //   this.currUser = { };
  //   this.router.navigate(['/']);
  // }
}
