import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

const ELEMENT_DATA: User[] = [
  { username: 'nguyenminhtri', name: 'Nguyen Minh Tri', department: 'Kinh doanh', phone: '', email: '' },
];

@Component({
  selector: 'app-user-management-main',
  templateUrl: './user-management-main.component.html',
  styleUrls: ['./user-management-main.component.scss']
})
export class UserManagementMainComponent implements OnInit {

  displayedColumns: string[] = ['position', 'username', 'name', 'department', 'phone', 'email'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  panelOpenState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface User {
  username: string;
  name: string;
  department: string;
  phone: string;
  email: string;
}
