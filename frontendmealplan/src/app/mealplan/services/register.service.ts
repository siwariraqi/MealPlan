import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "express";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  // private BASE_URL: string = "http://localhost:8080/users/adduser";

  constructor(private httpClient: HttpClient, private router: Router) {}

  // registerUser(user: User): Observable<object> {
  //   return this.httpClient.post(this.BASE_URL, user);
  // }
}
