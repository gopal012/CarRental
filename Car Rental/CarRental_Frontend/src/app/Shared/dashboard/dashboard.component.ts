import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { AuthService } from 'src/app/Services/auth.service';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  userId:number=0
  cars:Car[] = [];
  filterForm!:FormGroup
  filteredCar:Car[]=[];

  constructor(private carService:CarService,
              private formBuilder:FormBuilder,
              private toast:NgToastService,
              private authService:AuthService,
              private router:Router,
              private route:ActivatedRoute
             ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params=>{
      this.userId = (params['userId']);
    }))
    this.carService.getAllCars().subscribe({
      next:(res=>{
        this.cars = res
      }),
      error:(err=>{
        console.log(err);
      })
    })
    this.filterForm = this.formBuilder.group({
      maker:[''],
      model:[''],
      rentPrice:''
    })
  }

  //User searching car based upon filters
  onSearch(){
    if(this.authService.isLoggedIn()){
      if(this.filteredCar.length>0){
        while(this.filteredCar.length>0){
          this.filteredCar.pop();
        }
      }
      this.carService.getAllCars().subscribe({
        next:(res=>{
          this.cars = res;
          this.cars.forEach((e)=>{
            if((e.makerName.toLowerCase() == this.filterForm.value.maker.toLowerCase() || e.model.toLowerCase() == this.filterForm.value.model.toLowerCase() || e.price<=this.filterForm.value.rentPrice) && e.isAvailaible == true){
              this.filteredCar.push(e);
            }
          })
          if(this.filteredCar.length<=0){
            this.toast.error({detail:"Sorry",summary:"No Car Availaible this time !!",duration:5000})
          }
          else if(this.filterForm.value.maker == '' && this.filterForm.value.model == '' && this.filterForm.value.rentPrice == '' ){
            this.toast.warning({detail:"Warning",summary:"Please Provide Some Input to Filter !!",duration:5000})
          }
        }),
        error:(err=>{
          console.log(err);
          this.toast.error({detail:"Something Went Wrong",summary:"Try Again Later !!",duration:5000})
        })
      })
    }
    else{
      this.toast.warning({detail:"You Are Not LoggedIn",summary:"Login First to Search!!",duration:5000})
    }
  }

  //User wants car detail
  details(carId:string){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/user/details'],{queryParams:{CarId:carId,userId:this.userId}})
    }
    else{
      this.toast.info({detail:"You Are Not LoggedIn",summary:"Login First to See Details !!",duration:5000})
    }
  }

}

