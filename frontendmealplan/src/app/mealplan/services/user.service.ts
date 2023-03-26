import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { catchError, observable, Observable, switchMap, tap, throwError } from 'rxjs';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import { User } from '../models/User';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  CHOOSEPLAN = 'users/choosePlan?userId=';
  UPDATEPROFILE = 'users/updateProfile';
  GETUSER = 'users/getUser?userId=';
  CHANGEPASSWORD = 'users/changePassword';
  DELETEACCOUNT = 'users/deleteAccount';
  RESETACCOUNT = 'users/resetAccount';
  LOGOUT = 'users/logout';

  constructor(private http:HttpClient, private apiService:ApiService) { }

  getUser(userId: number): Observable<User> {
    const params = new HttpHeaders().set('userId', String(userId));
    return this.apiService.get<User>(this.GETUSER+ `${userId}`)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            return throwError('User not found');
          }
          return throwError('Something went wrong');
        })
      );
  }

  changePassword(request:ChangePasswordRequest):Observable<string>{
    return this.apiService.post<string>(this.CHANGEPASSWORD,request);
  }

  
  updateProfile(user:User):Observable<User>{
    return this.apiService.post<User>(this.UPDATEPROFILE,user);
  }

  choosePlan(userId: number, planId: number): Observable<string> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('planId', planId.toString());

    return this.apiService.post<string>(this.CHOOSEPLAN+`${userId}` +"&planId="+`${planId}`  )
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            return throwError('User or plan not found');
          }
          return throwError('Something went wrong');
        })
      );
  }
  

  deleteAccount(email, password, userId) {
    return this.apiService.delete<string>(this.DELETEACCOUNT+"?email="+`${email}` 
               +"&password="+`${password}` + "&userId=" + `${userId}` );
 }

 resetAccount(email, password, userId) {
  return this.apiService.post<string>(this.RESETACCOUNT+"?email="+`${email}` 
             +"&password="+`${password}` + "&userId=" + `${userId}` );
}

  logout(){
    return this.apiService.post<any>(this.LOGOUT);
  }

}
