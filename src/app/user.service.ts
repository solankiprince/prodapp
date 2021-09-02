import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  adduser(name:string,email:string,pass1:string){
    return this.http.post('https://prodapp.glitch.me/api/user/add',{'name':name,'email':email,'pass1':pass1
  });
  }
  loginUser(username:string,password:string){
    return this.http.post('https://prodapp.glitch.me/api/user/login',{'email':username,'pass1':password});

  }
}
