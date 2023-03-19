import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_BASE_URL = "http://127.0.0.1:8080/";

  constructor(private httpClient: HttpClient) { }

  get<T>(serviceName: string, httpHeaders?: HttpHeaders) {
    const options = {
      headers: httpHeaders,
      withCredentials: false
    };
    return this.httpClient.get<T>(this.SERVER_BASE_URL + serviceName, options);
  }

  post<T>(serviceName: string, body?: any, httpHeaders?: HttpHeaders) {
    const options = {
      headers: httpHeaders,
      withCredentials: false
    };
    return this.httpClient.post<T>(this.SERVER_BASE_URL + serviceName, body, options);
  }

  delete<T>(serviceName: string, httpHeaders?: HttpHeaders) {
    const options = {
      headers: httpHeaders,
      withCredentials: false
    };
    return this.httpClient.delete<T>(this.SERVER_BASE_URL + serviceName, options);
  }

  put<T>(serviceName: string, body?: any, httpHeaders?: HttpHeaders) {
    const options = {
      headers: httpHeaders,
      withCredentials: false
    };
    return this.httpClient.put<T>(this.SERVER_BASE_URL + serviceName, body, options);
  }
}
