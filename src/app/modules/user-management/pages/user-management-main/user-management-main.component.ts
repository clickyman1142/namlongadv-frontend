import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from '../../shared/user.service';

const ELEMENT_DATA: User[] = [
  { username: 'nguyenminhtri', name: 'Nguyen Minh Tri', department: 'Kinh doanh', phone: '', email: '' },
];

@Component({
  selector: 'app-user-management-main',
  templateUrl: './user-management-main.component.html',
  styleUrls: ['./user-management-main.component.scss']
})
export class UserManagementMainComponent implements OnInit {

  displayedColumns: string[] = ['position', 'username', 'name', 'department', 'phone', 'email', 'actions'];
  panelOpenState = false;
  users: any[];
  dataSource: MatTableDataSource<User>;

  pageSizeOptions = [
    5, 10, 50, 100, 500, 1000, 5000
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll(0, 10).subscribe(rs => {
      this.users = rs.data;
      this.buildTable();
    });
  }

  buildTable() {
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  deleteUser(index: number, userId: string) {
    this.userService.delete(userId).subscribe(rs => {
      if (!rs) { return; }
      this.users = this.users.splice(index - 1, 1);
      this.dataSource.data = this.users;
      this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
    });
  }

}

export interface User {
  username: string;
  name: string;
  department: string;
  phone: string;
  email: string;
}
