import { Injectable } from "@angular/core";
import { AuthService } from "../Services/auth.service";
import { Router } from "@angular/router";
import jwt_decode from 'jwt-decode';
import { Tokens } from "../Models/token.model";

@Injectable({
  providedIn:"root"
})

export class AdminAuthGuard{
  info!:Tokens
  token : any = ''
constructor(private authService:AuthService,private router:Router){}

  canActivate():boolean{
    this.token = this.authService.getToken();
    this.info = jwt_decode(this.token);
    var role = this.info.role
    if(this.authService.isLoggedIn() && role == 'Admin'){
      return true;
    }
    else if(this.authService.isLoggedIn() && role != 'Admin'){
      this.router.navigate(['user'])
      return false;
    }
    else{
      this.router.navigate(['login'])
      return false;
    }
  }
}
