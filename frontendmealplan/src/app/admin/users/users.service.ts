import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class UsersService {
    public url = "api/users";
    constructor(public http:HttpClient) { }
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    addUser(user:User){	    
        return this.http.post(this.url, user);
    }

    updateUser(user:User){
        return this.http.put(this.url, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    } 
} 