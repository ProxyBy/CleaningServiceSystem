import { Component, OnInit } from '@angular/core';
import { TimePickerModule } from "ng2-simple-timepicker";
import { CleaningTypeService} from "../../services/cleaning-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  cleaningTypes;
  email;
  selectedDays: any[] = [];
  cleaningRequest = {
    selectedDay: null
  };

  constructor(
    private cleaningTypeService: CleaningTypeService,
    private router: Router
  ) { }

  onViewOffersSubmit(cleaningRequest){
    this.router.navigate(['/companyParametrizedList', cleaningRequest]);
  }

  ngOnInit() {
    this.cleaningTypeService.getCleaningTypes().subscribe(data => {
      this.cleaningTypes = data.types;
    })
  }

  addDay(name:string, isChecked: boolean) {
    if(isChecked) {
      this.selectedDays.push(name);
    } else {
      let index = this.selectedDays.indexOf(name);
      this.selectedDays.splice(index,1);
    }
    this.cleaningRequest.selectedDay = this.selectedDays;
  }

}
