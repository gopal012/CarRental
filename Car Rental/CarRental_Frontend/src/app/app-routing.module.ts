import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './Components/Anonymous/navbar/navbar.component';
import { LoginComponent } from './Components/Anonymous/login/login.component';
import { DashboardComponent } from './Shared/dashboard/dashboard.component';
import { AdminNavbarComponent } from './Components/Admin/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { UserNavbarComponent } from './Components/User/user-navbar/user-navbar.component';
import { AuthGuard } from './Guards/auth.guard';
import { AdminAuthGuard } from './Guards/admin-auth.guard';
import { AddCarComponent } from './Components/Admin/add-car/add-car.component';
import { EditCarComponent } from './Components/Admin/edit-car/edit-car.component';
import { CarDetailsComponent } from './Components/User/car-details/car-details.component';
import { MyRentalsComponent } from './Components/User/my-rentals/my-rentals.component';
import { UserAgreementsComponent } from './Components/User/user-agreements/user-agreements.component';
import { AllAgreementsComponent } from './Components/Admin/all-agreements/all-agreements.component';
import { AgreementEditComponent } from './Components/Admin/agreement-edit/agreement-edit.component';
import { RequestForReturnComponent } from './Components/Admin/request-for-return/request-for-return.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:NavbarComponent,
    children:[
      {
        path:"",
        component:DashboardComponent
      },
      {
        path:'login',
        component:LoginComponent
      }
    ]
  },
  {
    path:'admin',
    canActivate:[AdminAuthGuard],
    component:AdminNavbarComponent,
    children:[
      {
        path:"",
        component:AdminDashboardComponent
      },
      {
        path:"add",
        component:AddCarComponent
      },
      {
        path:"edit/:carId",
        component:EditCarComponent
      },
      {
        path:'agreements',
        component:AllAgreementsComponent
      },
      {
        path:"agreements/:id",
        component:AgreementEditComponent
      },
      {
        path:'request-for-return',
        component:RequestForReturnComponent
      }
    ]
  },
  {
    path:'user',
    canActivate:[AuthGuard],
    component:UserNavbarComponent,
    children:[
      {
        path:"",
        component:DashboardComponent
      },
      {
        path:"details",
        component:CarDetailsComponent
      },
      {
        path:"rentals",
        component:MyRentalsComponent
      },
      {
        path:"myRentAgreements",
        component:UserAgreementsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [NavbarComponent,
                                  LoginComponent,
                                  DashboardComponent,
                                  AdminNavbarComponent,
                                  AdminDashboardComponent,
                                  UserNavbarComponent,
                                  AddCarComponent,
                                  EditCarComponent,
                                  CarDetailsComponent,
                                  MyRentalsComponent,
                                  UserAgreementsComponent,
                                  AllAgreementsComponent,
                                  AgreementEditComponent,
                                  RequestForReturnComponent
                                 ]
