import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_BASE_URL = 'http://127.0.0.1:8080/users/';
  CHOOSEPLAN = this.SERVER_BASE_URL+"choosePlan";

  constructor(private http:HttpClient) { }

  choosePlan(userId: number, planId: number): Observable<string> {

    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('planId', planId.toString());


    return this.http.post<string>(this.CHOOSEPLAN, null, { params: params });
  }

}
