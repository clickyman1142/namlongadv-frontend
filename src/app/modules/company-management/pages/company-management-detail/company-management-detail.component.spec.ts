import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManagementDetailComponent } from './company-management-detail.component';

describe('CompanyManagementDetailComponent', () => {
  let component: CompanyManagementDetailComponent;
  let fixture: ComponentFixture<CompanyManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
