import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-management-detail',
  templateUrl: './user-management-detail.component.html',
  styleUrls: ['./user-management-detail.component.scss']
})
export class UserManagementDetailComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

}
