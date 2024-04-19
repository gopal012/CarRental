import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Car } from '../Models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseApiUrl:string="https://localhost:7070/"

  constructor(private http:HttpClient) { }

  getAllCars():Observable<Car[]>{
    return this.http.get<Car[]>(this.baseApiUrl + 'api/Car');
  }

  addNewCar(addCar:Car):Observable<Car>{
    addCar.carId = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Car>(this.baseApiUrl + 'api/Car',addCar)
  }

  getCar(id:string):Observable<Car>{
    return this.http.get<Car>(this.baseApiUrl + 'api/Car/' + id)
  }

  UpdateCar(carId:string,car:Car):Observable<Car>{
    return this.http.put<Car>(this.baseApiUrl + 'api/Car/' + carId,car)
  }

  DeleteCar(carId:string):Observable<Car>{
    return this.http.delete<Car>(this.baseApiUrl + 'api/Car/' + carId);
  }
}
