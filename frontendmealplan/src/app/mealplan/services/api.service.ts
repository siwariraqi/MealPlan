import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private SERVER_BASE_URL = "http://127.0.0.1:8080/";

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  get<T>(serviceName: string, httpHeaders?: HttpHeaders, body?: any) {
    //httpHeaders = this.appendToknToHeaders(httpHeaders);
    const options = {
      //headers: httpHeaders,
      withCredentials: false,
    };
    const url = this.getURLWithUserId(serviceName);
    console.log("httpHeaders: *******");
    console.log(options);
    return this.httpClient.get<T>(url, options);
  }

  post<T>(serviceName: string, body?: any, httpHeaders?: HttpHeaders) {
    //httpHeaders = this.appendToknToHeaders(httpHeaders);

    const options = {
      //headers: httpHeaders,
      withCredentials: false,
    };
    const url = this.getURLWithUserId(serviceName);
    return this.httpClient.post<T>(url, body, options);
  }

  delete<T>(serviceName: string, httpHeaders?: HttpHeaders) {
    //httpHeaders = this.appendToknToHeaders(httpHeaders);

    const options = {
      //headers: httpHeaders,
      withCredentials: false,
    };
    const url = this.getURLWithUserId(serviceName);
    console.log("httpHeaders: ");
    console.log(httpHeaders);
    return this.httpClient.delete<T>(url, options);
  }

  put<T>(serviceName: string, body?: any, httpHeaders?: HttpHeaders) {
    //httpHeaders = this.appendToknToHeaders(httpHeaders);

    const options = {
      //headers: httpHeaders,
      withCredentials: false,
    };
    const url = this.getURLWithUserId(serviceName);
    console.log("httpHeaders: ");
    console.log(httpHeaders);

    return this.httpClient.put<T>(url, body, options);
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
    /*if (httpHeaders == null) {
      httpHeaders = new HttpHeaders();
    }*/

    const token = this.tokenStorage.getToken();
    if (token != null) {
    }
    /*httpHeaders.set("Authorization", "Bearer " + token);
    console.log("header:$$$");
    console.log(httpHeaders);
*/
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }
}
