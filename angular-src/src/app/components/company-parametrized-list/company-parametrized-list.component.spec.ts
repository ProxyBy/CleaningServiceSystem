import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyParametrizedListComponent } from './company-parametrized-list.component';

describe('CompanyParametrizedListComponent', () => {
  let component: CompanyParametrizedListComponent;
  let fixture: ComponentFixture<CompanyParametrizedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyParametrizedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyParametrizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
