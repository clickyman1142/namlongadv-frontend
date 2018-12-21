import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementDetailComponent } from './customer-management-detail.component';

describe('CustomerManagementDetailComponent', () => {
  let component: CustomerManagementDetailComponent;
  let fixture: ComponentFixture<CustomerManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
