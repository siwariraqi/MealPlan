import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, observable, Observable, throwError } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_BASE_URL = 'http://127.0.0.1:8080/users/';
  CHOOSEPLAN = this.SERVER_BASE_URL+"choosePlan";
  UPDATEPROFILE = this.SERVER_BASE_URL+"updateProfile";
  GETUSER = this.SERVER_BASE_URL+"getUser";

  constructor(private http:HttpClient) { }

  getUser(userId: number): Observable<User> {
    const params = new HttpParams().set('userId', String(userId));
    return this.http.get<User>(this.GETUSER, { params })
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            return throwError('User not found');
          }
          return throwError('Something went wrong');
        })
      );
  }

  updateProfile(user:User):Observable<string>{
    return this.http.post<any>(this.UPDATEPROFILE,user);
  }

  choosePlan(userId: number, planId: number): Observable<string> {

    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('planId', planId.toString());


    return this.http.post<string>(this.CHOOSEPLAN, null, { params: params });
  }

}
