import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { ProfileComponent } from './components/profile/profile.component';
import { AppComponent } from './app.component';
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { HttpModule} from "@angular/http";
import { AuthGuard} from "./guards/auth.guard";
import { UserComponent } from './components/user/user.component';
import { UserService } from "./services/user.service";
import { CompanyService } from "./services/company.service";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { CleaningTypeService } from "./services/cleaning-type.service";
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationService } from "./services/reservation.service";
import { TimePickerModule } from "ng2-simple-timepicker";
import { CompanyParametrizedListComponent } from "./components/company-parametrized-list/company-parametrized-list.component";
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { CompanyAvailableListComponent } from "./components/company-available-list/company-available-list.component";
import { CompanyRegisterComponent } from "./components/company-register/company-register.component";
import { CompanyInfoComponent} from "./components/company-info/company-info.component";


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
//  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'companyList', component: CompanyListComponent},
  {path: 'companyRegister', component: CompanyRegisterComponent},
  {path: 'users', component: UserComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'companyParametrizedList', component: CompanyParametrizedListComponent},
  {path: 'companyList', component: CompanyListComponent},
  {path: 'companyAvailableList', component: CompanyAvailableListComponent},
  {path: 'companyInfo', component: CompanyInfoComponent}
];

@NgModule({
  declarations: [
    FileSelectDirective,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    AppComponent,
    UserComponent,
    CompanyRegisterComponent,
    CompanyListComponent,
    ReservationComponent,
    CompanyParametrizedListComponent,
    CompanyListComponent,
    CompanyInfoComponent,
    CompanyAvailableListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
//    TimePickerModule,
    HttpModule
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    UserService,
    CompanyService,
    CleaningTypeService,
    ReservationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
