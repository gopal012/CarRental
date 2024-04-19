import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { RentAgreement } from 'src/app/Models/rent.model';
import { CarService } from 'src/app/Services/car.service';
import { RentAgreementsService } from 'src/app/Services/rent-agreements.service';

@Component({
  selector: 'app-user-agreements',
  templateUrl: './user-agreements.component.html',
  styleUrls: ['./user-agreements.component.css']
})
export class UserAgreementsComponent implements OnInit{
  userId:number=0
  agreements:RentAgreement[]=[]
  cars:Car[]=[]

  constructor(private route:ActivatedRoute,
              private rentService:RentAgreementsService,
              private toast:NgToastService,
              private carService:CarService
             ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params=>{
      this.userId = params['userId']
    }))
    this.rentService.getAllAgreements().subscribe({
      next:(res=>{
        res.forEach((e)=>{
          if(e.userId == this.userId){
            this.agreements.push(e);
          }
        })
      })
    })
    this.carService.getAllCars().subscribe({
      next:(res=>{
        this.cars = res
      }),
      error:(err=>{
        this.toast.error({detail:"Error!",summary:"Try Again Later !!",duration:5000})
      })
    })
  }

  //User making Request to return Car
  requestForReturn(agreement:RentAgreement){
    if(agreement.requestForReturn == true){
      this.toast.info({detail:"Hey User,",summary:"Request for Car Return Has Been Placed Already!!",duration:5000})
    }
    else{
      agreement.requestForReturn = true;
      this.rentService.updateAgreement(agreement.id,agreement).subscribe({
        next:(res=>{
          this.toast.success({detail:"Success",summary:"Request to Return Car Successful !!", duration:5000})
        }),
        error:(err=>{
          this.toast.error({detail:"Error! Something went wrong",summary:"Try Again Later !!",duration:5000});
        })
      })
    }
  }

}
