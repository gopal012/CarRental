import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit{

  isAvailaible:string=''

  carDetails:Car = {
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
              private toast:NgToastService
             ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
       const carId =  params.get('carId')
       if(carId){
        this.carService.getCar(carId).subscribe({
          next:(res=>{
            this.carDetails = res
            this.isAvailaible = this.carDetails.isAvailaible.toString();
          })
        })
       }
      }
    })
  }

  //Sending Edited Car Data to Backend
  onSubmit(){
    if(this.isAvailaible == "true"){
      this.carDetails.isAvailaible = true;
    }
    else{
      this.carDetails.isAvailaible = false;
    }
    this.carService.UpdateCar(this.carDetails.carId,this.carDetails).subscribe({
      next:(res=>{
        this.toast.success({detail:"Success",summary:"Car Edited Successfully !!",duration:5000})
        this.router.navigate(['admin']);
      }),
      error:(err=>{
        console.log(err);
        this.toast.error({detail:"Something Went Wrong",summary:"Try Again Later !!",duration:5000})
      })
    })
  }

}
