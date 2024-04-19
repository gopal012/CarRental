import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit{

  userId:number=0
  isAvailaible:boolean=false
  rentDuration:number=0

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
              private toast:NgToastService,
              private router:Router
             ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params=>{
      const carId = (params['CarId'])
      this.userId = (params['userId'])
      if(params['duration']){
        this.rentDuration = (params['duration'])
      }
      if(carId){
        this.carService.getCar(carId).subscribe({
          next:(res=>{
            this.carDetails = res
            this.isAvailaible = res.isAvailaible;
          })
        })
      }
  }))
  }

  //Increasing rent duration by one
  plus(){
    this.rentDuration++;
  }

  //Decreasing rent duration by one
  minus(){
    if(this.rentDuration>0){
      this.rentDuration--;
    }
    else{
      this.toast.warning({detail:"Warning",summary:"Rent Duration Can't Less Than 0 !!"})
    }
  }

  //Booking Car for Rent
  bookNow(){
    if(this.rentDuration>0){
      this.router.navigate(['/user/rentals'],{queryParams:{duration:this.rentDuration,carId:this.carDetails.carId,userId:this.userId}});
    }
    else{
      this.toast.warning({detail:"Warning",summary:"Duration Can't Be 0 !!", duration:5000})
    }
  }

}
