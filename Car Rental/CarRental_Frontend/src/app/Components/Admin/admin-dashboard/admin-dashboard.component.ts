import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/Models/car.model';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next: (res => {
        this.cars = res
      }),
      error: (err => {
        this.toast.error({ detail: "Something Went Wrong", summary: "Try Again Later !!", duration: 5000 })
      })
    })
  }

  //Deleting Car Data from Backend
  onDelete(carId: string) {
    this.carService.DeleteCar(carId).subscribe({
      next: (res => {
        this.toast.success({ detail: "Success", summary: "Car Deleted Successfully", duration: 5000 })
        this.cars = []
        this.ngOnInit();
      }),
      error: (err => {
        this.toast.error({ detail: "Something Went Wrong", summary: "Try Again Later !!", duration: 5000 })
      })
    })
  }
}
