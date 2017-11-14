import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAvailableListComponent } from './company-available-list.component';

describe('CompanyAvailableListComponent', () => {
  let component: CompanyAvailableListComponent;
  let fixture: ComponentFixture<CompanyAvailableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAvailableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAvailableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
