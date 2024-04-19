import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { RentAgreement } from 'src/app/Models/rent.model';
import { CarService } from 'src/app/Services/car.service';
import { RentAgreementsService } from 'src/app/Services/rent-agreements.service';

@Component({
  selector: 'app-all-agreements',
  templateUrl: './all-agreements.component.html',
  styleUrls: ['./all-agreements.component.css']
})
export class AllAgreementsComponent implements OnInit{

  agreements:RentAgreement[]=[]
  cars:Car[] = [];

  constructor(private rentService:RentAgreementsService,
              private router:Router,
              private toast:NgToastService,
              private carService:CarService
             ){}

  ngOnInit(): void {
    this.rentService.getAllAgreements().subscribe({
      next:(res=>{
        this.agreements = res;
      })
    })
    this.carService.getAllCars().subscribe({
      next:(res=>{
        this.cars = res;
      })
    })
  }

  //Deleting Agreement From Backend
  delete(id:string){
    this.rentService.deleteAgreement(id).subscribe({
      next:(res=>{
        console.log(res);
        this.toast.success({detail:"Success",summary:"Agreement Deleted Successfully",duration:5000})
        this.agreements = []
        this.ngOnInit();
      }),
      error:(err=>{
        console.log(err);
      })
    })
  }

  //Editing Existing Agreement
  edit(id:string){
    this.router.navigate(['/admin/agreements/'+id])
  }
}
