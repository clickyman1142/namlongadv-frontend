import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from '../../shared/user.service';
import { Spinner } from 'src/app/shared/services/spinner.service';
import { Dialog } from 'src/app/shared/services/dialog.service';
import { SnackBar } from 'src/app/shared/services/snackbar.service';

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

  constructor(
    private userService: UserService,
    private spinner: Spinner,
    private dialog: Dialog,
    private snackBar: SnackBar
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.userService.getAll(0, 10).subscribe(rs => {
      this.users = rs.data.data;
      this.buildDataTable();
      this.spinner.hide();
    });
  }

  buildDataTable() {
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  deleteUser(index: number, userId: string) {
    const params = {
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc muốn xóa tài khoản này ra khỏi hệ thống?'
    };
    this.dialog.confirm(params).then(rs => {
      if (!rs) { return; }
      this.userService.delete(userId).subscribe(res => {
        if (!res.data) {
          this.snackBar.open('Không thể xóa tài khoản này');
          return;
        }
        const data = this.dataSource.data;
        data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
        this.dataSource.data = data;
      });
    });
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface User {
  username: string;
  name: string;
  department: string;
  phone: string;
  email: string;
}
