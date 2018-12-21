import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvManagementDetailComponent } from './adv-management-detail.component';

describe('AdvManagementDetailComponent', () => {
  let component: AdvManagementDetailComponent;
  let fixture: ComponentFixture<AdvManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
