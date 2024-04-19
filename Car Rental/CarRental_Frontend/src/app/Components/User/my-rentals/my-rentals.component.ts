import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { RentAgreement } from 'src/app/Models/rent.model';
import { Tokens } from 'src/app/Models/token.model';
import { AuthService } from 'src/app/Services/auth.service';
import { CarService } from 'src/app/Services/car.service';
import { RentAgreementsService } from 'src/app/Services/rent-agreements.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.css']
})
export class MyRentalsComponent implements OnInit{

  todayDate:Date=new Date()

  info!:Tokens
  token : any = ''
  fullName:string=''

  rentAgreement:RentAgreement={
    id:"",
    carId:"",
    userId:0,
    rentDuration:0,
    totalRentAmount:0,
    rentDate:this.getDateInFormat(this.todayDate),
    returnDate:'',
    requestForReturn:false
  }

  carDetails:Car={
    carId:'',
    makerName:'',
    model:'',
    imageUrl:'',
    price:0,
    isAvailaible:false
  }

  constructor(private route:ActivatedRoute,
              private carService:CarService,
              private router:Router,
              private rentService:RentAgreementsService,
              private toast:NgToastService,
              private authService:AuthService
             ){  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params=>{
      this.rentAgreement.carId = params['carId']
      this.rentAgreement.rentDuration = params['duration']
      this.rentAgreement.userId = params['userId']
    }))
    this.carService.getCar(this.rentAgreement.carId).subscribe({
      next:(res=>{
        this.carDetails = res;
        this.rentAgreement.totalRentAmount = (this.carDetails.price*this.rentAgreement.rentDuration);
        this.calculateReturnDate(this.rentAgreement.rentDuration)
      }),
      error:(err=>{
        console.log(err);
      })
    })
    this.token = this.authService.getToken();
    this.info = jwt_decode(this.token);
    this.fullName = this.info.name;
  }

  //Calculating Return Date Onbehalf of duration
  private calculateReturnDate(duration:number):void{
    const returnDate = new Date(this.todayDate);
    let returndate = this.todayDate.getDate()
    while(duration>0){
      returndate++;
      duration--;
    }
    returnDate.setDate(returndate);
    this.rentAgreement.returnDate = this.getDateInFormat(returnDate);
  }

  // private calculateReturnDate(): void {
  //   const returnDate = new Date(this.todayDate);
  //   returnDate.setDate(this.todayDate.getDate() + this.rentAgreement.rentDuration);
  //   this.rentAgreement.returnDate = this.getDateInFormat(returnDate);
  // }

  //Converting date from date format to string format
  getDateInFormat(inputDate:Date){
    let month=inputDate.getMonth()+1;
    let date=inputDate.getDate();
    let todayDateString = [inputDate.getFullYear(),(month>9?'':'0')+month,(date>9?'':'0')+date].join('-');
    return todayDateString;
  }
  
  //Editing Rental Agreement Presented to user
  edit(){
    this.router.navigate(['/user/details'],{queryParams:{userId:this.rentAgreement.userId,duration:this.rentAgreement.rentDuration,CarId:this.rentAgreement.carId}})
  }

  //Accepting Rental Agreement by User
  accept(){
    this.rentService.addAgreement(this.rentAgreement).subscribe({
      next:(res=>{
        this.carDetails.isAvailaible = false;
        this.carService.UpdateCar(this.carDetails.carId,this.carDetails).subscribe({
          next:(response=>{
            this.toast.success({detail:'Success',summary:'Agreement Submitted !!',duration:5000})
            this.router.navigate(['/user/myRentAgreements'],{queryParams:{userId:this.rentAgreement.userId}})
          }),
          error:(er=>{
            this.toast.error({detail:'Error',summary:'Something Went Wrong',duration:5000})
          })
        })
      }),
      error:(err=>{
        this.toast.error({detail:'Error',summary:'Something Went Wrong',duration:5000})
      })
    })
  }

}

