import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit{

  isAvailaible:string=''

  addCar:Car = {
    carId:'',
    makerName:'',
    model:'',
    imageUrl:'',
    price:0,
    isAvailaible:false
  };

  constructor(private carService:CarService,
              private router:Router,
              private toast:NgToastService
             ){}

  ngOnInit(): void {
  }

  //Submitting Car Data to Backend
  OnSubmit(){
    if(this.isAvailaible == "true"){
      this.addCar.isAvailaible = true;
    }
    else{
      this.addCar.isAvailaible = false;
    }
    this.carService.addNewCar(this.addCar).subscribe({
      next:(res=>{
        this.toast.success({detail:"Success",summary:"Car Added Successfully",duration:5000})
        this.router.navigate(['admin'])
      }),
      error:(err=>{
        this.toast.error({detail:"Something Went Wrong",summary:"Try Again Later !!",duration:5000})
      })
    })
  }

}
