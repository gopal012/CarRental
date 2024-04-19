import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm !:FormGroup

  constructor(private formBuilder:FormBuilder,
              private router:Router,
              private authService:AuthService,
              private toast:NgToastService
             ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next:(res=>{
          this.authService.storeToken(res.token);
          if(res.isAdmin){
            this.toast.success({detail:"Hello " + res.fullName, summary:"Login Success", duration:5000})
            this.loginForm.reset();
            this.router.navigate(['admin']);
          }
          else{
            this.toast.success({detail:"Hello " + res.fullName, summary:"Login Success", duration:5000})
            this.router.navigate(['user'],{queryParams:{userId:res.id}});
            this.loginForm.reset();
          }
        }),
        error:(err=>{
          console.log(err);
          this.toast.error({detail:"Login Failed", summary:"Invalid Credentials", duration:5000}) 
        })
      })
    }
  }
}
