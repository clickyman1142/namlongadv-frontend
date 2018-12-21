import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvManagementMainComponent } from './adv-management-main.component';

describe('AdvManagementMainComponent', () => {
  let component: AdvManagementMainComponent;
  let fixture: ComponentFixture<AdvManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
