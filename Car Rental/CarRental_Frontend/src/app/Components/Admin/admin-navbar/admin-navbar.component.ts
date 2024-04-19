import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private toast:NgToastService
             ){}

  ngOnInit(): void {
  }

  logout(){
    this.authService.signOut()
    this.toast.success({detail:"Suceess",summary:"Signed Out Successfully !!",duration:5000})
  }

}
