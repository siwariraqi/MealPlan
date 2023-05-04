import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";
import { catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private SERVER_BASE_URL = "http://127.0.0.1:8080/";

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  get<T>(serviceName: string, httpHeaders?: HttpHeaders, body?: any) {
    const options = {
      withCredentials: false,
    };
    const url = this.getURLWithUserId(serviceName);
    const result = this.httpClient.get<T>(url, options);

    const checkedResult = result.pipe(
      tap((result) => {
        // Check the result here
        if (result === null || result === undefined) {
          throw new Error("Invalid result");
        }
        return result;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP error here
        if (error.status === 401) {
          // Redirect to login page if the error is unauthorized access
          //this.router.navigate(["/login"]);
          this.router.navigate(["/mealplan/login"]);
        }
        return throwError(error);
      })
    );

    // Subscribe to the checked result
    return checkedResult;
  }

  post<T>(serviceName: string, body?: any, httpHeaders?: HttpHeaders) {
    const options = {
      withCredentials: false,
    };
    const url = this.getURLWithUserId(serviceName);
    const result = this.httpClient.post<T>(url, body, options);
    const checkedResult = result.pipe(
      tap((result) => {
        // Check the result here
        if (result === null || result === undefined) {
          throw new Error("Invalid result");
        }
        return result;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP error here
        if (error.status === 401) {
          // Redirect to login page if the error is unauthorized access
          //this.router.navigate(["/login"]);
          this.router.navigate(["/mealplan/login"]);
        }
        return throwError(error);
      })
    );

    // Subscribe to the checked result
    return checkedResult;
  }

  delete<T>(serviceName: string, httpHeaders?: HttpHeaders) {
    const options = {
      withCredentials: false,
    };
    const url = this.getURLWithUserId(serviceName);
    const result = this.httpClient.delete<T>(url, options);
    const checkedResult = result.pipe(
      tap((result) => {
        // Check the result here
        if (result === null || result === undefined) {
          throw new Error("Invalid result");
        }
        return result;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP error here
        if (error.status === 401) {
          // Redirect to login page if the error is unauthorized access
          //this.router.navigate(["/login"]);
          this.router.navigate(["/mealplan/login"]);
        }
        return throwError(error);
      })
    );

    // Subscribe to the checked result
    return checkedResult;
  }

  put<T>(serviceName: string, body?: any, httpHeaders?: HttpHeaders) {
    const options = {
      withCredentials: false,
    };
    const url = this.getURLWithUserId(serviceName);
    const result = this.httpClient.put<T>(url, body, options);
    const checkedResult = result.pipe(
      tap((result) => {
        // Check the result here
        if (result === null || result === undefined) {
          throw new Error("Invalid result");
        }
        return result;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP error here
        if (error.status === 401) {
          // Redirect to login page if the error is unauthorized access
          //this.router.navigate(["/login"]);
          this.router.navigate(["/mealplan/login"]);
        }
        return throwError(error);
      })
    );

    // Subscribe to the checked result
    return checkedResult;
  }

  getURLWithUserId(serviceName: string) {
    const LoggedInUserId = this.auth.getUserFromSessionStorage().userId;
    console.log("LoggedInUserId " + LoggedInUserId);
    let url = `${this.SERVER_BASE_URL}${serviceName}`;
    if (serviceName.indexOf("?") === -1) {
      url += `?`;
    } else {
      url += `&`;
    }
    url += `loggedInUserId=${LoggedInUserId}`;
    return url;
  }

  appendToknToHeaders(httpHeaders?: HttpHeaders): HttpHeaders {
    const token = this.tokenStorage.getToken();
    if (token != null) {
    }
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }
}
