import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementMainComponent } from './customer-management-main.component';

describe('CustomerManagementMainComponent', () => {
  let component: CustomerManagementMainComponent;
  let fixture: ComponentFixture<CustomerManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
