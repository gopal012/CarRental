import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { RentAgreement } from 'src/app/Models/rent.model';
import { RentAgreementsService } from 'src/app/Services/rent-agreements.service';

@Component({
  selector: 'app-agreement-edit',
  templateUrl: './agreement-edit.component.html',
  styleUrls: ['./agreement-edit.component.css']
})
export class AgreementEditComponent implements OnInit{

  requestForReturn:string=''

  agreementDetails:RentAgreement={
    id:'',
    carId:'',
    userId:0,
    rentDuration:0,
    totalRentAmount:0,
    rentDate:'',
    returnDate:'',
    requestForReturn:false
  }

  constructor(private route:ActivatedRoute,
              private rentService:RentAgreementsService,
              private router:Router,
              private toast:NgToastService
             ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
       const id =  params.get('id');
       console.log
       if(id){
        this.rentService.getAgreementById(id).subscribe({
          next:(res=>{
            this.agreementDetails = res
            this.requestForReturn = res.requestForReturn.toString();
          })
        })
       }
      }
    })
  }

  //Submitting Edited Agreement to Backend
  onSubmit(){
    if(this.requestForReturn == "true"){
      this.agreementDetails.requestForReturn = true;
    }
    else{
      this.agreementDetails.requestForReturn = false;
    }
    this.rentService.updateAgreement(this.agreementDetails.id,this.agreementDetails).subscribe({
      next:(res=>{
        this.toast.success({detail:"Success",summary:"Agreement Updated Successfully",duration:5000});
        this.router.navigate(['/admin/agreements']);
      }),
      error:(err=>{
        this.toast.error({detail:"Error! Something Went Wrong",summary:"Try Again Later!!",duration:5000})
      })
    })
  }
}
