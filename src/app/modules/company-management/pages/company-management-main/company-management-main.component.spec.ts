import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManagementMainComponent } from './company-management-main.component';

describe('CompanyManagementMainComponent', () => {
  let component: CompanyManagementMainComponent;
  let fixture: ComponentFixture<CompanyManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
