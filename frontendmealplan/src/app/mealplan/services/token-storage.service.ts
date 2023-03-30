import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "../interfaces/decoded-token";
import { User } from "../models/User";

const TOKEN_KEY = "auth-token";
const USER_KEY = "user";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    const decodedToken: DecodedToken = jwt_decode(token);
    alert("?????");
    alert(decodedToken);
    const user = decodedToken.user;
    //console.log(decodedToken);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    console.log(JSON.parse(window.sessionStorage.getItem(USER_KEY)));
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
