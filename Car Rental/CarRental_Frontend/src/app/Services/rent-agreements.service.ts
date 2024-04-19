import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentAgreement } from '../Models/rent.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentAgreementsService {

  baseApiUrl:string="https://localhost:7070/api/RentAgreement"

  constructor(private http:HttpClient) { }

  getAllAgreements():Observable<RentAgreement[]>{
    return this.http.get<RentAgreement[]>(this.baseApiUrl);
  }

  getAgreementById(id:string):Observable<RentAgreement>{
    return this.http.get<RentAgreement>(this.baseApiUrl + '/' + id);
  }

  addAgreement(rentAgreement:RentAgreement):Observable<RentAgreement>{
    rentAgreement.id = "00000000-0000-0000-0000-000000000000";
    return this.http.post<RentAgreement>(this.baseApiUrl,rentAgreement);
  }

  deleteAgreement(id:string):Observable<RentAgreement>{
    return this.http.delete<RentAgreement>(this.baseApiUrl + '/' + id);
  }

  updateAgreement(id:string,rentAgreement:RentAgreement):Observable<RentAgreement>{
    return this.http.put<RentAgreement>(this.baseApiUrl + '/' + id,rentAgreement);
  }
}
