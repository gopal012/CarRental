import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl:string="https://localhost:7070/api/User/authenticate"; 

  constructor(private http:HttpClient,private router:Router) { }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseApiUrl}`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['/home/login'])
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
}
