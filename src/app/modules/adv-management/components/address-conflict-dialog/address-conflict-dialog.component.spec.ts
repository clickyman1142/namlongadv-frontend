import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressConflictDialogComponent } from './address-conflict-dialog.component';

describe('AddressConflictDialogComponent', () => {
  let component: AddressConflictDialogComponent;
  let fixture: ComponentFixture<AddressConflictDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressConflictDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressConflictDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
