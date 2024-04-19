import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  userId:number=0
  constructor(private authServie:AuthService,
              private toast:NgToastService,
              private route:ActivatedRoute,
              private router:Router
             ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params=>{
      this.userId = (params['userId']);
    }))
  }

  //User Logging Out
  logout(){
    this.authServie.signOut();
    this.toast.success({detail:"Suceess",summary:"Signed Out Successfully !!",duration:5000})
  }

  //User going to Home Tab
  home(){
    this.router.navigate(['user'],{queryParams:{userId:this.userId}})
  }

  //User going to My Agreements tab
  myAgreements(){
    this.router.navigate(['/user/myRentAgreements'],{queryParams:{userId:this.userId}})
  }

}
