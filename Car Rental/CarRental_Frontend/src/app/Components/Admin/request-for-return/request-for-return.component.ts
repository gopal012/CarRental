import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { RentAgreement } from 'src/app/Models/rent.model';
import { CarService } from 'src/app/Services/car.service';
import { RentAgreementsService } from 'src/app/Services/rent-agreements.service';

@Component({
  selector: 'app-request-for-return',
  templateUrl: './request-for-return.component.html',
  styleUrls: ['./request-for-return.component.css']
})
export class RequestForReturnComponent implements OnInit{

  requests:RentAgreement[]=[]
  cars:Car[]=[]

  constructor(private rentService:RentAgreementsService,
              private toast:NgToastService,
              private carService:CarService
             ){}

  ngOnInit(): void {
    this.rentService.getAllAgreements().subscribe({
      next:(res=>{
        res.forEach((e)=>{
          if(e.requestForReturn == true){
            this.requests.push(e);
          }
        })
      })
    })
    this.carService.getAllCars().subscribe({
      next:(res=>{
        this.cars = res
      })
    })
  }

  //Accepting Request for Return of Car
  accept(id:string,carId:string){
    this.rentService.deleteAgreement(id).subscribe({
      next:(res=>{
        this.requests = [];
        this.ngOnInit();
        this.toast.success({detail:"Success",summary:"Car Return Request Completed",duration:5000})
        this.carService.getCar(carId).subscribe({
          next:(resp=>{
            resp.isAvailaible = true;
            this.carService.UpdateCar(resp.carId,resp).subscribe({
              next:(response=>{

              }),
              error:(er=>{
                this.toast.error({detail:"Error! Something Went Wrong",summary:"Try Again Later",duration:5000})
              })
            })
          }),
          error:(e=>{
            this.toast.error({detail:"Error! Something Went Wrong",summary:"Try Again Later",duration:5000})
          })
        })
      }),
      error:(err=>{
        this.toast.error({detail:"Error! Something Went Wrong",summary:"Try Again Later",duration:5000})
      })
    })
  }

  //Rejecting Request for Return of Car
  reject(id:string,request:RentAgreement){
    request.requestForReturn = false
    this.rentService.updateAgreement(id,request).subscribe({
      next:(res=>{
        this.requests = [];
        this.ngOnInit();
        this.toast.success({detail:"Success",summary:"Car Return Request Rejected",duration:5000})
      }),
      error:(err=>{
        this.toast.error({detail:"Error! Something Went Wrong",summary:"Try Again Later",duration:5000})
      })
    })
  }

}
