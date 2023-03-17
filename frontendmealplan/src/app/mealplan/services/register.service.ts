import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private BASE_URL: string = "http://localhost:8080/";
  private ADD_USER_API: string = "users/adduser";

  constructor(private httpClient: HttpClient, private router: Router) {}

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL + this.ADD_USER_API, user);
  }
}
